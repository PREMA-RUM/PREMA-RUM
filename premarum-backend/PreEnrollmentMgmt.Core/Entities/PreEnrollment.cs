namespace PreEnrollmentMgmt.Core.Entities;

public partial class PreEnrollment
{
    public PreEnrollment()
    {
        Selections = new HashSet<SemesterOffer>();
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int StudentId { get; set; }

    public int SemesterId { get; set; }

    public Semester Semester { get; set; } = null!;
    public ICollection<SemesterOffer> Selections { get; set; }
}