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
        return (await _preEnrollmentService.GetStudentPreEnrollments(studentEmail))
            .Select(pe => _mapper.Map<PreEnrollmentDTO>(pe));
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
        var mapped = result.Select(so => _mapper.Map<PreEnrollmentSemesterOfferDTO>(so));
        return mapped;
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
}