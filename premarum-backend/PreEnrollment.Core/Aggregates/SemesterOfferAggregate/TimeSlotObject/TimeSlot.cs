namespace PreEnrollment.Core.Aggregates.SemesterOfferAggregate.TimeSlotObject;

public class TimeSlot
{
    public TimeSlot(Day weekDay, TimeOnly startTime, TimeOnly endTime)
    {
        if (startTime >= endTime)
        {
            throw new InvalidDataException("TimeSlot's StartTime must be less the EndTime");
        }
        WeekDay = weekDay;
        StartTime = startTime;
        EndTime = endTime;
    }
    public Day WeekDay { get; private set; }
    public TimeOnly StartTime  { get; private set; }
    public TimeOnly EndTime { get; private set; }
}