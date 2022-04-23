using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.Application.Repositories;

public class SemesterOfferRepository : ISemesterOfferRepository
{
    private readonly PremaRumDbContext _context;

    public SemesterOfferRepository(PremaRumDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SemesterOffer>> GetByIdList(int[] ids)
    {
        return await GetCompleteSemesterOfferQueryable()
            .Where(so => ids.Contains(so.Id))
            .ToListAsync();
    }

    public async Task<Semester?> GetAvailableSemesterById(int id)
    {
        return await _context
            .Semesters
            .Include(sem => sem.Term)
            .SingleOrDefaultAsync(se => se.Id == id);
    }

    public async Task<IEnumerable<Semester>> GetAvailableSemesters()
    {
        return await _context
            .Semesters
            .OrderByDescending(sem => sem.Id)
            .Include(sem => sem.Term)
            .ToListAsync();
    }

    public async Task<IEnumerable<Department>> GetAvailableDepartments()
    {
        return await _context
            .Departments
            .ToListAsync();
    }

    public async Task<IEnumerable<Course>> GetAvailableCourses()
    {
        return await _context
            .Courses
            .Include(c => c.Department)
            .ToListAsync();
    }

    public IQueryable<SemesterOffer> GetCompleteSemesterOfferQueryable()
    {
        return _context
            .SemesterOffers
            .Include(so => so.Semester).ThenInclude(s => s.Term)
            .Include(so => so.Course)
            .Include(so => so.Professors)
            .Include(so => so.TimeSlots).ThenInclude(ts => ts.WeekDay);
    }
}