using System.ComponentModel.DataAnnotations;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class NewPreEnrollmentRequest
{ 
    [Required] public string Name { get; set; }
    [Required] public int SemesterId { get; set; }
}