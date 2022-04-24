namespace PreEnrollmentMgmt.CourseParserLib;

public class CourseTakenVisitorValue
{
    public string CourseName { get; set; }
    public int? CourseId { get; set; }

    public CourseTakenVisitorValue(string courseName, int? courseId)
    {
        CourseName = courseName;
        CourseId = courseId;
    }

    public CourseTakenVisitorValue(string courseName)
    {
        CourseName = courseName;
    }

    protected bool Equals(CourseTakenVisitorValue other)
    {
        return CourseName.Equals(other.CourseName);
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != this.GetType()) return false;
        return Equals((CourseTakenVisitorValue) obj);
    }

    public override int GetHashCode()
    {
        return CourseName.GetHashCode();
    }
}