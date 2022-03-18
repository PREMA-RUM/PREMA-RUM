using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.WebApi.Controllers.DTOS;

public class CoursesTakenDTO
{
    public int studentId { get; set; }
    public int couseId { get; set; }
    public int semesterId { get; set; }
    public IEnumerable<CoursesTaken> coursesTaken { get; set; }
}