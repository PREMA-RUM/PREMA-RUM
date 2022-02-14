namespace PreEnrollment.Core.Aggregates.StudentAggregate;

public class Student: Aggregate
{
    public Student(string email)
    {
        Email = email;
        CoursesTaken = new HashSet<CoursesTaken>();
    }

    public Student(long id, string email, IEnumerable<CoursesTaken> coursesTaken)
    {
        Id = id;
        Email = email;
        CoursesTaken = coursesTaken; // TODO: Add validation here
    }

    public long? Id { get; private set; }
    public string Email { get; private set; }
    public IEnumerable<CoursesTaken> CoursesTaken { get; private set; }
}