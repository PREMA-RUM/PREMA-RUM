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

    public void AddCoursesTaken(CoursesTaken coursesTaken)
    {
        CoursesTaken.Add(coursesTaken);
    }
    
    public int[] RemoveCoursesTaken(int[] CourseIds)
    {
        var deleted = new List<int>();
        foreach (var coursesTaken in CoursesTaken)
        {
            if (CourseIds.Contains(coursesTaken.CourseId))
                deleted.Add(coursesTaken.CourseId);
        }
        
        ((HashSet<CoursesTaken>) CoursesTaken).RemoveWhere(taken => CourseIds.Contains(taken.CourseId));

        return deleted.ToArray();

    }
}