namespace PreEnrollmentMgmt.Core.Entities.Output;

public class PreEnrollmentCourseParserOutput
{
    public PreEnrollmentCourseParserOutput()
    {
        NotComplyingCourses = new HashSet<Course>();
        MissingCourses = new HashSet<Course>();
    }

    public HashSet<Course> NotComplyingCourses { get; set; }
    public HashSet<Course> MissingCourses { get; set; }
}