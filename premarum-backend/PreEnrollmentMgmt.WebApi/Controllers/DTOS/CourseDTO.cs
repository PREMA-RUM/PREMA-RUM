namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class CourseDTO
{
    public int Id { get; set; }
    public string CourseCode { get; set; } = null!;
    public string CourseDescription { get; set; }
    public string CoursePrerequisites { get; set; }
    public string CourseCorequisites { get; set; }
    public int CourseCredit { get; set; }
    public string CourseName { get; set; } = null!;
}