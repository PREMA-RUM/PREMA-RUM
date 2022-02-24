using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.Application.Repositories;

public class PreEnrollmentRepository: IPreEnrollmentRepository
{
    private readonly PremaRumDbContext _context;

    public PreEnrollmentRepository(PremaRumDbContext context)
    {
        _context = context;
    }

    private IQueryable<PreEnrollment> GetCompletePreEnrollmentQueryable()
    {
        return _context
            .PreEnrollments
            .Include(pe => pe.Semester).ThenInclude(s => s.Term)
            .Include(pe => pe.Selections).ThenInclude(so => so.Course)
            .Include(pe => pe.Selections).ThenInclude(so => so.Professors)
            .Include(pe => pe.Selections).ThenInclude(so => so.TimeSlots)
            .Include("Selections.TimeSlots.WeekDay");
    }
    
    public async Task<IEnumerable<PreEnrollment>> GetByStudentIdComplete(int studentId)
    {
        return await
            GetCompletePreEnrollmentQueryable()
                .Where(pe => pe.StudentId == studentId)
                .ToListAsync();
    }

    public async Task<PreEnrollment> GetByIdWithSemesterOffersSimple(int preEnrollmentId)
    {
        return await _context
            .PreEnrollments
            .Include(pe => pe.Selections)
            .Include(pe => pe.StudentId)
            .SingleAsync(pe => pe.Id == preEnrollmentId);
    }

    public void Save(PreEnrollment preEnrollment)
    {
        _context.PreEnrollments.Update(preEnrollment);
    }
    
    
}