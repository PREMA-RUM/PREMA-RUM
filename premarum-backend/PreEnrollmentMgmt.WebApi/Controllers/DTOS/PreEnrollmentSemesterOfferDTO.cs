namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class PreEnrollmentSemesterOfferDTO
{
    public int Id { get; set; }
    public string SectionName { get; set; }
    public int Capacity { get; set; }
    public string? ClassRoom { get; set; }
    public CourseDTO Course { get; set; }
    public IEnumerable<ProfessorDTO> Professors { get; set; }
    public IEnumerable<TimeSlotDTO> TimeSlots { get; set; }
}