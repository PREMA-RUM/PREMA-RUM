using Microsoft.Build.Framework;
using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class CoursesTakenDTO
{
    public CourseDTO Course { get; set; }
    public SemesterDTO? Semester { get; set; }
    
}