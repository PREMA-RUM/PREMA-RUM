namespace PreEnrollmentMgmt.Core.Entities;

public class Course
{
    public int Id { get; set; }
    public string CourseCode { get; set; } = null!;

    protected bool Equals(Course other)
    {
        return Id == other.Id;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != GetType()) return false;
        return Equals((Course) obj);
    }

    public override int GetHashCode()
    {
        return Id;
    }

    public string? CourseDescription { get; set; }
    public string? CoursePrerequisites { get; set; }
    public string? CourseCorequisites { get; set; }
    public int CourseCredit { get; set; }
    public string CourseName { get; set; } = null!;
    public Department? Department { get; set; }
}