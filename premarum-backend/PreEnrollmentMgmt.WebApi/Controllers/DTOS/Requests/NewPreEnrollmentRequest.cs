using System.ComponentModel.DataAnnotations;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class NewPreEnrollmentRequest
{ 
    [Required][MaxLength(100)] public string Name { get; set; }
    [Required] public int SemesterId { get; set; }
}