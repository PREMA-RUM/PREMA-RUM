namespace PreEnrollmentMgmt.Core.Entities.ComputedEntities;

public class OverlappingPreEnrollmentSelections
{
    public OverlappingPreEnrollmentSelections() { }
    
    public int SemesterOfferIdA { get; set; }
    public int SemesterOfferIdB { get; set; }
    public TimeOnly StartTimeA { get; set; }
    public TimeOnly StartTimeB { get; set; }
    public TimeOnly EndTimeA { get; set; }
    public TimeOnly EndTimeB { get; set; }
    public int DayId { get; set; }
}