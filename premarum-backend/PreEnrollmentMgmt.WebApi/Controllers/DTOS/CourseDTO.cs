namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class CourseDTO
{
    public int Id { get; set; }
    public string CourseCode { get; set; }
    public string CourseName { get; set; }
    public string Prerequisites { get; set; }
    public string Corequisites { get; set; }
    public int Credits { get; set; }
}