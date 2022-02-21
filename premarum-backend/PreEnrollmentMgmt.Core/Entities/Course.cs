namespace PreEnrollmentMgmt.Core.Entities;

public partial class Course
{
    public int Id { get; set; }
    public string CourseCode { get; set; } = null!;
    public string? CourseDescription { get; set; }
    public string? CoursePrerequisites { get; set; }
    public string? CourseCorequisites { get; set; }
    public int CourseCredit { get; set; }
    public string CourseName { get; set; } = null!;
    public Department? Department { get; set; }
}