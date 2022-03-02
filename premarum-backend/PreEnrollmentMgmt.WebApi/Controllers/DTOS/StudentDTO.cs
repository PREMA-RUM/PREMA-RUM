namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class StudentDTO
{
    public int Id { get; set; }
    public int DepartmentId { get; set; }
    public string Email { get; set; } = null!;
}