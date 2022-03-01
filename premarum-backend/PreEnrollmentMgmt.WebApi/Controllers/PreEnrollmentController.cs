using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.Services;
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

    public PreEnrollmentController(ITransactionManager transactionManager, IMapper mapper,
        PreEnrollmentService preEnrollmentService)
    {
        _transactionManager = transactionManager;
        _mapper = mapper;
        _preEnrollmentService = preEnrollmentService;
    }


    [HttpGet("Student/{studentEmail}")]
    public async Task<IEnumerable<PreEnrollmentDTO>> GetStudentPreEnrollments([FromRoute] string studentEmail)
    {
        var result = await _preEnrollmentService.GetStudentPreEnrollments(studentEmail);
        return _mapper.Map<IEnumerable<PreEnrollmentDTO>>(result);
    }

    [HttpPost("{preEnrollmentId}/Selections/Student/{studentEmail}")]
    public async Task<IEnumerable<PreEnrollmentSemesterOfferDTO>> AddNewSelection(
        [FromRoute] int preEnrollmentId,
        [FromBody] PreEnrollmentSelectionRequest toSelect,
        [FromRoute] string studentEmail
    )
    {
        var result =
            await _preEnrollmentService.AddSelectionToPreEnrollment(preEnrollmentId, studentEmail,
                toSelect.CourseOfferings);
        await _transactionManager.Commit();
        return _mapper.Map<IEnumerable<PreEnrollmentSemesterOfferDTO>>(result);
    }

    [HttpDelete("{preEnrollmentId}/Selections/Student/{studentEmail}")]
    public async Task RemoveSelection(
        [FromRoute] int preEnrollmentId,
        [FromBody] PreEnrollmentSelectionRequest toDelete,
        [FromRoute] string studentEmail
    )
    {
        await _preEnrollmentService.RemoveSelectionFromPreEnrollment(preEnrollmentId, studentEmail,
            toDelete.CourseOfferings);
        await _transactionManager.Commit();
    }

    [HttpPost("Student/{studentEmail}")]
    public async Task<PreEnrollmentDTO> CreateNewPreEnrollment([FromRoute] string studentEmail,
        [FromBody] NewPreEnrollmentRequest request)
    {
        var result = await _preEnrollmentService.CreateNewPreEnrollment(studentEmail, request.Name, request.SemesterId);
        await _transactionManager.Commit();
        return _mapper.Map<PreEnrollmentDTO>(result);
    }
}