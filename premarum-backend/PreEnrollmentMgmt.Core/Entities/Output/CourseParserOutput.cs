using PreEnrollmentMgmt.CourseParserLib;

namespace PreEnrollmentMgmt.Core.Entities.Output;

public class CourseParserOutput
{
    public CourseParserOutput(bool compliesWithRequisites = false)
    {
        CompliesWithRequisites = compliesWithRequisites;
        MissingCourses = new HashSet<string>();
    }

    public bool CompliesWithRequisites { get; set; }
    public HashSet<string> MissingCourses { get; set; }
}