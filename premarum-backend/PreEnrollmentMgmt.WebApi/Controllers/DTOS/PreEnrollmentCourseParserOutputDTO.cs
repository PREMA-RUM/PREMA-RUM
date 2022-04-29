namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class PreEnrollmentCourseParserOutputDTO
{
    public HashSet<CourseDTO> NotComplyingCourses { get; set; } = null!;
    public HashSet<CourseDTO> MissingCourses { get; set; } = null!;
}