namespace PreEnrollmentMgmt.Core.Entities.Output;

public class CourseRequisiteValue
{
    public CourseRequisiteValue(int courseId, bool studentHasRequisites = false)
    {
        CourseId = courseId;
        StudentHasRequisites = studentHasRequisites;
    }

    public int CourseId { get; set; }
    public bool StudentHasRequisites { get; set; }
}