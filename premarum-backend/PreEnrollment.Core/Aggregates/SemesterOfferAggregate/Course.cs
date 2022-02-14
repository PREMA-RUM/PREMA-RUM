namespace PreEnrollment.Core.Aggregates.SemesterOfferAggregate;

public class Course
{
    public Course(long id, string courseCode, string courseName, string description, string prerequisites, string corequisites, int credits, Department department)
    {
        // TODO: Add validation
        Id = id;
        CourseCode = courseCode;
        CourseName = courseName;
        Description = description;
        Prerequisites = prerequisites;
        Corequisites = corequisites;
        Credits = credits;
        Department = department;
    }

    public long Id { get; private set; }
    public string CourseCode { get; private set; }
    public string CourseName { get; private set; }
    public string Description { get; private set; }
    public string Prerequisites { get; private set; }
    public string Corequisites { get; private set; }
    public int Credits { get; private set; }
    public Department Department { get; private set; }
}