namespace PreEnrollment.WebApi.Controllers.DTOS;

public class PreEnrollmentDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Credits { get; set; }
    public IEnumerable<PreEnrollmentSemesterOfferDTO> Selections { get; set; }
}