using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.Application.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly PremaRumDbContext _context;

    public CourseRepository(PremaRumDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Course>> GetByIdList(int[] courseIds)
    {
        return await GetAllCourses()
            .Where(co => courseIds.Contains(co.Id))
            .ToListAsync();
    }

    private IQueryable<Course> GetAllCourses()
    {
        return _context
            .Courses;
    }
}