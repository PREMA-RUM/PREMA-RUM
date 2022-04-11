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

    public async Task<IEnumerable<PreEnrollment>> GetByStudentIdComplete(int studentId)
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
        int id = await _context
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
    
    private IQueryable<PreEnrollment> GetPartialPreEnrollmentQueryable()
    {
        return _context
            .PreEnrollments
            .Include(pe => pe.Semester).ThenInclude(s => s.Term)
            .OrderByDescending(pe => pe.Semester.Id)
            .Include(pe => pe.Selections).ThenInclude(so => so.Course)
            .Include("Selections.TimeSlots.WeekDay");
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