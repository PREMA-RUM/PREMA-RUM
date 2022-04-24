using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class CourseParserDTO
{
    public bool CompliesWithRequisites { get; set; }
    public Course?[] MissingCourses { get; set; }
}