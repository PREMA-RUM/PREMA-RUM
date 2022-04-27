namespace PreEnrollmentMgmt.Core.Entities.Output;

public class CourseRequisiteValue
{
    public CourseRequisiteValue(int courseId, string courseCode, bool studentHasRequisites = false)
    {
        CourseId = courseId;
        StudentHasRequisites = studentHasRequisites;
        CourseCode = courseCode;
    }

    protected bool Equals(CourseRequisiteValue other)
    {
        return CourseId == other.CourseId && StudentHasRequisites == other.StudentHasRequisites;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != GetType()) return false;
        return Equals((CourseRequisiteValue) obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(CourseId, StudentHasRequisites);
    }

    public int CourseId { get; set; }
    public bool StudentHasRequisites { get; set; }
    public string CourseCode { set; get; }
}