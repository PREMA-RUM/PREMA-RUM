using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.DataAccess;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EfTestController : ControllerBase
{
    private readonly PremaRumDbContext _context;

    public EfTestController(PremaRumDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public List<PreEnrollment> Testing()
    {
        var result = _context
            .PreEnrollments
            .Include(pe => pe.Semester)
            .Include(pe => pe.Selections).ThenInclude(so => so.Course)
            .Include(pe => pe.Selections).ThenInclude(so => so.Semester)
            .Include(pe => pe.Selections).ThenInclude(so => so.Professors)
            .Include(pe => pe.Selections).ThenInclude(so =>so.TimeSlots )
            .ToList();

        _context
            .Students
            .Include(st => st.CoursesTaken).ThenInclude(ct => ct.Course)
            .Include(st => st.CoursesTaken).ThenInclude(ct => ct.SemesterTaken)
            .ToList();

        _context
            .SemesterOffers
            .Include(so => so.Course)
            .Include(so => so.Professors)
            .Include(so => so.TimeSlots)
            .Include(so => so.PreEnrollments);

        Console.WriteLine(_context.PreEnrollments.Single(pe => pe.StudentId == 1));
        
        return new List<PreEnrollment>();
    }
}