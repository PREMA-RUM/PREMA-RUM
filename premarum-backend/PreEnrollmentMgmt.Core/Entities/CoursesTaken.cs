namespace PreEnrollmentMgmt.Core.Entities;

public class CoursesTaken
{
    public CoursesTaken(int courseId, int studentId, int semesterId)
    {
        StudentId = studentId;
        CourseId = courseId;
        SemesterId = semesterId;
    }

    public CoursesTaken(int courseId, int studentId)
    {
        StudentId = studentId;
        CourseId = courseId;
        SemesterId = null;
    }

    public int CourseId { get; set; }
    public int? SemesterId { get; set; }
    public int StudentId { get; set; }
    public Course? Course { get; set; }
    public Semester? SemesterTaken { get; set; }
}