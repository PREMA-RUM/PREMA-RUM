using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.Services;
using PreEnrollmentMgmt.WebApi.Controllers.DTOS;

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
    public async Task<IEnumerable<StudentDTO>> GetStudent([FromRoute] string studentEmail)
    {
        var student = await _studentService.GetStudent(studentEmail);
        return _mapper.Map<IEnumerable<StudentDTO>>(student);
    }
    
    [HttpPut("Student/{studentEmail}")]
    public async Task UpdateDepartmentName(
        [FromRoute] string studentEmail,
        [FromBody] int newName
    )
    {
        await _studentService.UpdateDepartmentName(studentEmail, newName);
        await _transactionManager.Commit();
    }
}