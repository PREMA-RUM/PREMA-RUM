namespace PreEnrollmentMgmt.Core.Entities;

public class SemesterOffer
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

    public bool OverlapsWith(SemesterOffer target)
    {
        foreach (var ts in TimeSlots)
        {
            foreach (var ts2 in target.TimeSlots)
            {
                if (ts.WeekDay?.Id != ts2.WeekDay?.Id) // Cannot overlap if not the same day
                    continue;
                if (ts.StartTime.IsBetween(ts2.StartTime, ts2.EndTime))
                    return true;
                if (ts.EndTime.IsBetween(ts2.StartTime, ts2.EndTime))
                    return true;
                if (ts2.StartTime.IsBetween(ts.StartTime, ts.EndTime))
                    return true;
                if (ts2.EndTime.IsBetween(ts.StartTime, ts.EndTime))
                    return true;
            }   
        }
        return false;
    }
}