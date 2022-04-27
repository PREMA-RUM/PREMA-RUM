using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.Output;

namespace PreEnrollmentMgmt.Core.Services.Interfaces;

public interface ICourseParsingService
{
    public Task<List<Course>> GetMissingCourses(IEnumerable<CoursesTaken> coursesTaken, Course course);
}