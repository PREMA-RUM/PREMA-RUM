namespace PreEnrollmentMgmt.CourseParserLib;

public class CourseTakenVisitorValue
{
    public string CourseCode { get; set; }
    public int CourseId { get; set; }

    public CourseTakenVisitorValue(string courseCode, int courseId)
    {
        CourseCode = courseCode;
        CourseId = courseId;
    }

    public CourseTakenVisitorValue(string courseCode)
    {
        CourseCode = courseCode;
    }

    protected bool Equals(CourseTakenVisitorValue other)
    {
        return CourseCode.Equals(other.CourseCode);
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
        return CourseCode.GetHashCode();
    }
}