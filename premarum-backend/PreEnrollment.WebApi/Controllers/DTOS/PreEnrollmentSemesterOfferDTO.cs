namespace PreEnrollment.WebApi.Controllers.DTOS;

public class PreEnrollmentSemesterOfferDTO
{
    public int Id { get; set; }
    public string Section { get; set; }
    public int Capacity { get; set; }
    public string Professor { get; set; }
    public CourseDTO Course { get; set; }
    public IEnumerable<TimeSlotDTO> TimeSlots { get; set; }
}