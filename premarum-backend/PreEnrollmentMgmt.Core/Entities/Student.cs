namespace PreEnrollmentMgmt.Core.Entities;

public class Student
{
    public Student()
    {
        PreEnrollments = new HashSet<PreEnrollment>();
        CoursesTaken = new HashSet<CoursesTaken>();
    }

    public int Id { get; set; }
    public string Email { get; set; }
    public int DepartmentId { get; set; }

    public ICollection<CoursesTaken> CoursesTaken { get; set; }
    public Department Department { get; set; } = null!;
    public ICollection<PreEnrollment> PreEnrollments { get; set; }
}