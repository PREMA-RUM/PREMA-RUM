using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.ComputedEntities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.Application.Repositories;

public class PreEnrollmentRepository : IPreEnrollmentRepository
{
    private readonly PremaRumDbContext _context;

    public PreEnrollmentRepository(PremaRumDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PreEnrollment>> GetByStudentIdPartial(int studentId)
    {
        return await
            GetPartialPreEnrollmentQueryable()
                .Where(pe => pe.StudentId == studentId)
                .ToListAsync();
    }

    public async Task<PreEnrollment?> GetByIdWithSemesterOffersSimple(int preEnrollmentId)
    {
        return await _context
            .PreEnrollments
            .Include(pe => pe.Selections)
            .SingleOrDefaultAsync(pe => pe.Id == preEnrollmentId);
    }

    public async Task<PreEnrollment?> GetByIdWithSemesterOffersComplete(int preEnrollmentId)
    {
        return await GetCompletePreEnrollmentQueryable()
            .SingleOrDefaultAsync(pe => pe.Id == preEnrollmentId);
    }

    public void Save(PreEnrollment preEnrollment)
    {
        _context.PreEnrollments.Update(preEnrollment);
    }

    public async Task<bool> ContainsWithNameStudentAndSemesterId(string name, int studentId, int semesterId)
    {
        var id = await _context
            .PreEnrollments
            .Where(pe =>
                pe.StudentId == studentId &&
                pe.Name == name &&
                pe.SemesterId == semesterId)
            .Select(pe => pe.Id)
            .SingleOrDefaultAsync();
        return id != 0;
    }

    public void DeletePreEnrollment(PreEnrollment preEnrollment)
    {
        _context.PreEnrollments.Remove(preEnrollment);
    }

    private IQueryable<PreEnrollment> GetCompletePreEnrollmentQueryable()
    {
        return _context
            .PreEnrollments
            .Include(pe => pe.Semester).ThenInclude(s => s.Term)
            .OrderByDescending(pe => pe.Semester.Id)
            .Include(pe => pe.Selections).ThenInclude(so => so.Course)
            .Include(pe => pe.Selections).ThenInclude(so => so.Professors)
            .Include(pe => pe.Selections).ThenInclude(so => so.TimeSlots)
            .Include("Selections.TimeSlots.WeekDay");
    }

    public async Task<IEnumerable<SemesterOffer>> GetRecommendationsForPreEnrollment(int preEnrollmentId)
    {
        return await _context
            .SemesterOffers
            .FromSqlRaw("select * from top_100_courses_for_pre_enrollment({0})", preEnrollmentId)
            .Include(so => so.Semester).ThenInclude(s => s.Term)
            .Include(so => so.Course)
            .Include(so => so.Professors)
            .Include(so => so.TimeSlots).ThenInclude(ts => ts.WeekDay)
            .ToListAsync();
    }

    private IQueryable<PreEnrollment> GetPartialPreEnrollmentQueryable()
    {
        return _context
            .PreEnrollments
            .Include(pe => pe.Semester).ThenInclude(s => s.Term)
            .OrderByDescending(pe => pe.Semester.Id)
            .Include(pe => pe.Selections).ThenInclude(so => so.Course);
    }

    public async Task<IEnumerable<OverlappingPreEnrollmentSelections>> GetConflictingSelections(int preEnrollmentId)
    {
        return await _context
            .OverlappingSemesterOffers
            .FromSqlRaw(
                "select * from sp_conflicting_selections({0})",
                preEnrollmentId
            ).ToListAsync();
    }
}