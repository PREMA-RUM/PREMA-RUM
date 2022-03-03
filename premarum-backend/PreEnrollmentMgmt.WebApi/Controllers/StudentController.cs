using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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

    [Authorize]
    [HttpGet]
    public async Task<StudentDTO> GetOrCreateStudent()
    {
        var student = await _studentService.GetOrCreateStudent(User.Identity?.Name!);
        await _transactionManager.Commit();
        return _mapper.Map<StudentDTO>(student);
    }

    [Authorize]
    [HttpPut]
    public async Task UpdateStudentDepartment(
        [FromBody] ChangeDepartmentRequest newDepartmentRequest
    )
    {
        await _studentService.UpdateDepartment(User.Identity?.Name!, newDepartmentRequest.DepartmentId);
        await _transactionManager.Commit();
    }
}