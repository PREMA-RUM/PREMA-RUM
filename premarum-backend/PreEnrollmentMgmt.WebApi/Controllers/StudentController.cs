using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.Services;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS.Requests;

namespace PreEnrollmentMgmt.WebApi.Controllers;


[Route("api/[controller]")]
[ApiController]

public class StudentController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly StudentService _studentService;
    private readonly ITransactionManager _transactionManager;
    
    
    public StudentController(ITransactionManager transactionManager, IMapper mapper,
        StudentService studentService)
    {
        _transactionManager = transactionManager;
        _mapper = mapper;
        _studentService = studentService;
    }

    [HttpGet("Student/{studentEmail}")]
    public async Task<StudentDTO> GetOrCreateStudent([FromRoute] string studentEmail)
    {
        var student = await _studentService.GetOrCreateStudent(studentEmail);
        await _transactionManager.Commit();
        return _mapper.Map<StudentDTO>(student);
    }
    
    [HttpPut("Student/{studentEmail}")]
    public async Task UpdateDepartmentName(
        [FromRoute] string studentEmail,
        [FromBody] ChangeDepartmentRequest newName
    )
    {
        await _studentService.UpdateDepartmentName(studentEmail, newName.DepartmentId);
        await _transactionManager.Commit();
    }
}