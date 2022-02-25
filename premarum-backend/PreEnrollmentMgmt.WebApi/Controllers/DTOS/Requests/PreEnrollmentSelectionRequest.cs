using System.ComponentModel.DataAnnotations;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class PreEnrollmentSelectionRequest
{
    [Required] [MaxLength(7)] public int[] CourseOfferings { get; set; }
}