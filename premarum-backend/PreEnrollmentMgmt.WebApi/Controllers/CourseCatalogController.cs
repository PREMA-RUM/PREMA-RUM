using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseCatalogController : ControllerBase
{
    private readonly ISemesterOfferRepository _semesterOfferRepository;
    private readonly IMapper _mapper;

    public CourseCatalogController(ISemesterOfferRepository semesterOfferRepository, IMapper mapper)
    {
        _semesterOfferRepository = semesterOfferRepository;
        _mapper = mapper;
    }

    [HttpGet("Semester")]
    public async Task<IEnumerable<SemesterDTO>> GetAvailableSemesters()
    {
        var result = await _semesterOfferRepository.GetAvailableSemesters();
        return _mapper.Map<IEnumerable<SemesterDTO>>(result);
    }
    
    [HttpGet("Department")]
    public async Task<IEnumerable<DepartmentDTO>> GetAvailableDepartments()
    {
        var result = await _semesterOfferRepository.GetAvailableDepartments();
        return _mapper.Map<IEnumerable<DepartmentDTO>>(result);
    }
    
    [HttpGet("Course")]
    public async Task<IEnumerable<CourseDTO>> GetAvailableCourses()
    {
        var result = await _semesterOfferRepository.GetAvailableCourses();
        return _mapper.Map<IEnumerable<CourseDTO>>(result);
    }

    // TODO: Add pagination for non filtered requests
    [HttpGet("")]
    public async Task<IEnumerable<PreEnrollmentSemesterOfferDTO>> FilterSemesterOffers(
        [FromQuery] int? semesterId = null)
    {
        var result = _semesterOfferRepository.GetCompleteSemesterOfferQueryable();
        if (semesterId != null)
            result = result.Where(so => so.Semester.Id == semesterId);
        result = result.OrderBy(so => so.Course.CourseCode);
        return _mapper.Map<IEnumerable<PreEnrollmentSemesterOfferDTO>>(await result.ToListAsync());
    }
}