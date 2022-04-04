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
    
    public async Task<IEnumerable<Course>> GetBySimpleCourseTakenList(SimpleCourseTaken[] coursesTaken)
    {
        var courseIds = new List<int>();
        foreach (var courseTaken in coursesTaken)
        {
            courseIds.Add(courseTaken.CourseId);
        }
        return await GetByIdList(courseIds.ToArray());
    }

    private IQueryable<Course> GetAllCourses()
    {
        return _context
            .Courses;
    }
}