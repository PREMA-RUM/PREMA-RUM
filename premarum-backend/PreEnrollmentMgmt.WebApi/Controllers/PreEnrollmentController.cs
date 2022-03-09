using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.Core.Entities.ComputedEntities;
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
}