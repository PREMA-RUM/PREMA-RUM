using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS;

namespace PreEnrollmentMgmt.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PreEnrollmentController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPreEnrollmentRepository _preEnrollmentRepository;

    public PreEnrollmentController(IMapper mapper, IPreEnrollmentRepository preEnrollmentRepository)
    {
        _mapper = mapper;
        _preEnrollmentRepository = preEnrollmentRepository;
    }

    [HttpGet("Student/{id}")]
    public async Task<IEnumerable<PreEnrollmentDTO>> GetStudentPreEnrollments([FromRoute] int id)
    {
        //TODO: Validate student requesting data is indeed the correct student
        var preEnrollments = await _preEnrollmentRepository
            .GetByStudentIdComplete(studentId: id);
        var mapped = preEnrollments
            .Select(pe => _mapper.Map<PreEnrollmentDTO>(pe));
        return mapped;
    }
}
