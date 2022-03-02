using System.ComponentModel.DataAnnotations;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class ChangeDepartmentRequest
{
    [Required][MaxLength(50)] public int DepartmentId { get; set; }
}