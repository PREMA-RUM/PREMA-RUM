using PreEnrollmentMgmt.CourseParserLib;

namespace PreEnrollmentMgmt.Core.Entities.Output;

public class PreEnrollmentCourseParserOutput
{
    public PreEnrollmentCourseParserOutput()
    {
        CourseRequisitesValue = new HashSet<CourseRequisiteValue>();
        MissingCourses = new HashSet<string>();
    }

    public HashSet<CourseRequisiteValue> CourseRequisitesValue { get; set; }
    public HashSet<string> MissingCourses { get; set; }
}