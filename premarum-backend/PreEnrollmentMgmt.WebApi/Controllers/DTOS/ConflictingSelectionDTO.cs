namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class ConflictingSelectionDTO
{
    public int SemesterOfferIdA { get; set; }
    public int SemesterOfferIdB { get; set; }
    public string StartTimeA { get; set; }
    public string StartTimeB { get; set; }
    public string EndTimeA { get; set; }
    public string EndTimeB { get; set; }
    public int DayId { get; set; }
}