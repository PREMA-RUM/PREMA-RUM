namespace PreEnrollmentMgmt.Core.Entities;

public class Student
{
    
     protected Student()
     {
         PreEnrollments = new HashSet<PreEnrollment>();
         CoursesTaken = new HashSet<CoursesTaken>();
     }
    public Student(string studentEmail)
    {
        Email = studentEmail;
        DepartmentId = null;
        PreEnrollments = new HashSet<PreEnrollment>();
        CoursesTaken = new HashSet<CoursesTaken>();
    }

    public int Id { get; set; }
    public string Email { get; set; }
    public int? DepartmentId { get; set; }

    public ICollection<CoursesTaken> CoursesTaken { get; set; }
    public Department? Department { get; set; }
    public ICollection<PreEnrollment> PreEnrollments { get; set; }

    public void AddPreEnrollment(PreEnrollment preEnrollment)
    {
        PreEnrollments.Add(preEnrollment);
    }
}