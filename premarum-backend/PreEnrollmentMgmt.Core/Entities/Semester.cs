namespace PreEnrollmentMgmt.Core.Entities;

public class Semester
{
    public int Id { get; set; }
    public int Year { get; set; }
    public Term Term { get; set; } = null!;
}