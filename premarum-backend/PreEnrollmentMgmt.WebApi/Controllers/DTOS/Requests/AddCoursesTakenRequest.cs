using System.ComponentModel.DataAnnotations;
using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

public class AddCoursesTakenRequest
{
    [Required] public SimpleCourseTaken[] CoursesTaken { get; set; }

}