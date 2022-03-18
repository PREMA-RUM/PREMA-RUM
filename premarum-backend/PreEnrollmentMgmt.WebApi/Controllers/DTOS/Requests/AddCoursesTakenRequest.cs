using System.ComponentModel.DataAnnotations;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class AddCoursesTakenRequest
{
    [Required] public int[] CoursesTakenIds { get; set; }
}