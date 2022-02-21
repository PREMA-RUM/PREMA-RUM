namespace PreEnrollmentMgmt.Core.Entities;

public partial class TimeSlot
{
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public Day WeekDay { get; set; }
}