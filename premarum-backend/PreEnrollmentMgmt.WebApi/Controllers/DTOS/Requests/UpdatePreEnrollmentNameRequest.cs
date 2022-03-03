using System.ComponentModel.DataAnnotations;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class UpdatePreEnrollmentNameRequest
{
    [Required] public string NewName { get; set; }
}