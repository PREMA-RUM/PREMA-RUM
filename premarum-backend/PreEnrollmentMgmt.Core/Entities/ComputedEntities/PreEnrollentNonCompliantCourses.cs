namespace PreEnrollmentMgmt.Core.Entities.Output;

public class PreEnrollentNonCompliantCourses
{
    public PreEnrollentNonCompliantCourses()
    {
        NotComplyingCourses = new HashSet<Course>();
        MissingCourses = new HashSet<Course>();
    }

    public HashSet<Course> NotComplyingCourses { get; set; }
    public HashSet<Course> MissingCourses { get; set; }

    public void IncludeMissingCourses(List<Course> missingCourses, SemesterOffer semesterOffer)
    {
        if (missingCourses.Any())
        {
            NotComplyingCourses.Add(semesterOffer.Course);
            MissingCourses.UnionWith(missingCourses);
        }
    }
}