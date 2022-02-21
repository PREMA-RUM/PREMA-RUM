namespace PreEnrollmentMgmt.Core.Entities;

public partial class Department
{
    public Department()
    {
        Courses = new HashSet<Course>();
        Professors = new HashSet<Professor>();
        Students = new HashSet<Student>();
    }

    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; } = null!;

    public ICollection<Course> Courses { get; set; }
    public ICollection<Professor> Professors { get; set; }
    public ICollection<Student> Students { get; set; }
}