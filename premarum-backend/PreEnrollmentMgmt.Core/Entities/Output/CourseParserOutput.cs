using PreEnrollmentMgmt.CourseParserLib;

namespace PreEnrollmentMgmt.Core.Entities.Output;

public class CourseParserOutput
{
    public CourseParserOutput(bool compliesWithRequisites, List<CourseTakenVisitorValue>? missingCourses)
    {
        CompliesWithRequisites = compliesWithRequisites;
        MissingCourses = missingCourses;
    }

    public bool CompliesWithRequisites { get; set; }
    public List<CourseTakenVisitorValue>? MissingCourses { get; set; }
}