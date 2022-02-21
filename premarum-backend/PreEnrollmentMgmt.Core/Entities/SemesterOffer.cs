namespace PreEnrollmentMgmt.Core.Entities;

public partial class SemesterOffer
{
    public SemesterOffer()
    {
        Professors = new HashSet<Professor>();
        PreEnrollments = new HashSet<PreEnrollment>();
        TimeSlots = new HashSet<TimeSlot>();
    }
    public int Id { get; set; }
    public int? Capacity { get; set; }
    public string SectionName { get; set; }
    public Course Course { get; set; } = null!;
    public Semester Semester { get; set; } = null!;
    public ICollection<Professor> Professors { get; set; }
    public ICollection<PreEnrollment> PreEnrollments { get; set; }
    public ICollection<TimeSlot> TimeSlots { get; set; }
}