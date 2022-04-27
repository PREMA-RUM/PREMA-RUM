using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Packaging;
using PreEnrollmentMgmt.Core.Entities.Output;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.Services;
using PreEnrollmentMgmt.Core.Services.Interfaces;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PreEnrollmentController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly PreEnrollmentService _preEnrollmentService;
    private readonly ITransactionManager _transactionManager;
    private readonly StudentValidationService _studentValidationService;
    private readonly ICourseParsingService _courseParsingService;

    public PreEnrollmentController(ITransactionManager transactionManager, IMapper mapper,
        PreEnrollmentService preEnrollmentService, StudentValidationService studentValidationService, ICourseParsingService courseParsingService)
    {
        _transactionManager = transactionManager;
        _mapper = mapper;
        _preEnrollmentService = preEnrollmentService;
        _studentValidationService = studentValidationService;
        _courseParsingService = courseParsingService;
    }


    [Authorize]
    [HttpGet]
    public async Task<IEnumerable<PreEnrollmentDTO>> GetStudentPreEnrollments()
    {
        var result = await _preEnrollmentService.GetStudentPreEnrollments(User.Identity?.Name!);
        return _mapper.Map<IEnumerable<PreEnrollmentDTO>>(result);
    }

    [Authorize]
    [HttpPost("{preEnrollmentId}/Selections")]
    public async Task<IEnumerable<PreEnrollmentSemesterOfferDTO>> AddNewSelection(
        [FromRoute] int preEnrollmentId,
        [FromBody] PreEnrollmentSelectionRequest toSelect
    )
    {
        var result =
            await _preEnrollmentService.AddSelectionToPreEnrollment(preEnrollmentId, User.Identity?.Name!,
                toSelect.CourseOfferings);
        await _transactionManager.Commit();
        return _mapper.Map<IEnumerable<PreEnrollmentSemesterOfferDTO>>(result);
    }

    [Authorize]
    [HttpDelete("{preEnrollmentId}/Selections")]
    public async Task RemoveSelection(
        [FromRoute] int preEnrollmentId,
        [FromBody] PreEnrollmentSelectionRequest toDelete
    )
    {
        await _preEnrollmentService.RemoveSelectionFromPreEnrollment(preEnrollmentId, User.Identity?.Name!,
            toDelete.CourseOfferings);
        await _transactionManager.Commit();
    }

    [Authorize]
    [HttpPost]
    public async Task<PreEnrollmentDTO> CreateNewPreEnrollment([FromBody] NewPreEnrollmentRequest request)
    {
        var result =
            await _preEnrollmentService.CreateNewPreEnrollment(User.Identity?.Name!, request.Name, request.SemesterId);
        await _transactionManager.Commit();
        return _mapper.Map<PreEnrollmentDTO>(result);
    }

    [Authorize]
    [HttpPut("{preEnrollmentId}")]
    public async Task UpdatePreEnrollmentName(
        [FromRoute] int preEnrollmentId,
        [FromBody] UpdatePreEnrollmentNameRequest updateNameRequest
    )
    {
        await _preEnrollmentService.UpdateName(preEnrollmentId, User.Identity?.Name!, updateNameRequest.NewName);
        await _transactionManager.Commit();
    }

    [Authorize]
    [HttpGet("{preEnrollmentId}/Overlaps")]
    public async Task<IEnumerable<ConflictingSelectionDTO>> GetPreEnrollmentWarnings([FromRoute] int preEnrollmentId)
    {
        var conflicts = await _preEnrollmentService.GetPreEnrollmentOverlaps(preEnrollmentId);
        return _mapper.Map<IEnumerable<ConflictingSelectionDTO>>(conflicts);
    }

    [Authorize]
    [HttpDelete("{preEnrollmentId}")]
    public async Task DeletePreEnrollment(int preEnrollmentId)
    {
        await _preEnrollmentService.DeletePreEnrollment(preEnrollmentId, User.Identity?.Name!);
        await _transactionManager.Commit();
    }

    [Authorize]
    [HttpGet("{preEnrollmentId}")]
    public async Task<PreEnrollmentDTO> GetPreEnrollmentById([FromRoute] int preEnrollmentId)
    {
        var result = await _preEnrollmentService.GetStudentPreEnrollmentById(User.Identity?.Name!, preEnrollmentId);
        return _mapper.Map<PreEnrollmentDTO>(result);
    }

    [Authorize]
    [HttpGet("{preEnrollmentId}/Recommendations")]
    public async Task<IEnumerable<PreEnrollmentSemesterOfferDTO>> GetRecommendations([FromRoute] int preEnrollmentId)
    {
        var result = await _preEnrollmentService.GetPreEnrollmentRecommendations(
            preEnrollmentId, User.Identity?.Name!);
        return _mapper.Map<IEnumerable<PreEnrollmentSemesterOfferDTO>>(result);
    }
    
    [Authorize]
    [HttpGet("{preEnrollmentId}/Requisites")]
    public async Task<PreEnrollmentCourseParserOutput> StudentCompliesWithRequisites( [FromRoute] int preEnrollmentId)
    {
        var preEnrollment = await GetPreEnrollmentById(preEnrollmentId);
        var selections =  preEnrollment.Selections;
            var student = await _studentValidationService.ValidateStudentExists(User.Identity?.Name!, true);
        var result = new PreEnrollmentCourseParserOutput();
        foreach (var semesterOffer in selections)
        {
            var courseParserOutput = _courseParsingService
                .CompliesWithRequisites(student.CoursesTaken, semesterOffer.Course.CoursePrerequisites);
            if (!courseParserOutput.CompliesWithRequisites)
            {
                result.CourseRequisitesValue.Add(new CourseRequisiteValue(semesterOffer.Course.Id));
                result.MissingCourses.AddRange(courseParserOutput.MissingCourses);
            }
        }
        return _mapper.Map<PreEnrollmentCourseParserOutput>(result);
    }
}