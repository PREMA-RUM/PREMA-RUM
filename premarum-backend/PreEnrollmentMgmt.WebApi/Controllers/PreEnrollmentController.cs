using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PreEnrollmentController : ControllerBase
{
    [HttpGet("Student/{id}")]
    public IEnumerable<PreEnrollmentDTO> GetStudentPreEnrollments([FromRoute] int id)
    {
        return new List<PreEnrollmentDTO>()
        {
            new PreEnrollmentDTO()
            {
                Id = 1,
                Name="First PreEnrollment",
                Selections = new List<PreEnrollmentSemesterOfferDTO>()
                {
                    new PreEnrollmentSemesterOfferDTO()
                    {
                        Id = 2,
                        Capacity = 10,
                        SectionName = "04",
                        Course = new CourseDTO()
                        {
                            Id=4,
                            Corequisites="Testing",
                            Prerequisites="Testing2",
                            CourseCode="CIIC4050",
                            CourseName = "CIIC4050",
                            Credits = 4
                        }
                    }
                }
            }
        };
    }
}
