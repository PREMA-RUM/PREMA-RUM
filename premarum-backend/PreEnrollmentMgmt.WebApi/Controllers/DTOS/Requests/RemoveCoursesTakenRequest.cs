using System.ComponentModel.DataAnnotations;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class RemoveCoursesTakenRequest
{
    [Required] [MaxLength(7)] public int[] CoursesIds { get; set; }
}