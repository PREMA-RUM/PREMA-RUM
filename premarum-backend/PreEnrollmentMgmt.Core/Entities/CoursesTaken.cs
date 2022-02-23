namespace PreEnrollmentMgmt.Core.Entities;

public class CoursesTaken
{
    public int CourseId { get; set; }
    public int SemesterId { get; set; }
    public int StudentId { get; set; }
    public Course? Course { get; set; }
    public Semester? SemesterTaken { get; set; }
}