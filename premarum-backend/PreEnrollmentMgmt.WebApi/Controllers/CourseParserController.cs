using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.Core.Entities.Output;
using PreEnrollmentMgmt.Core.Services;
using PreEnrollmentMgmt.CourseParserLib;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CourseParserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly StudentValidationService _studentValidationService;
    private readonly CourseParsingService _parsingService;


    public CourseParserController(IMapper mapper,
        StudentValidationService studentValidationService, CourseParsingService parsingService)
    {
        _mapper = mapper;
        _studentValidationService = studentValidationService;
        _parsingService = parsingService;
    }

    [Authorize]
    [HttpGet]
    public async Task<CourseParserOutput> StudentCompliesWithRequisites(
        [FromBody] CourseRequisitesRequest newCourseRequisitesRequest
    )
    {
        var student = await _studentValidationService.ValidateStudentExists(User.Identity?.Name!, true);

        return _mapper.Map<CourseParserOutput>(
            _parsingService.CompliesWithRequisites(student.CoursesTaken, newCourseRequisitesRequest.requisites));
    }
}