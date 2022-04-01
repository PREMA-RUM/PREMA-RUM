using Microsoft.Build.Framework;
using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class CoursesTakenDTO
{
    [Required] public int CourseId { get; set; }
    public int? SemesterId { get; set; }

}