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
    [HttpPost]
    public async Task UpdateStudentDepartment(
        [FromBody] ChangeDepartmentRequest newDepartmentRequest
    )
    {
        await _studentService.UpdateDepartment(User.Identity?.Name!, newDepartmentRequest.DepartmentId);
        await _transactionManager.Commit();
    }
    [Authorize]
    [HttpPost("/CoursesTaken")]
    public async Task<IEnumerable<CoursesTakenDTO>> AddCoursesTaken(
        [FromBody] AddCoursesTakenRequest newCoursesTakenRequest
    )
    {
        var result = await _studentService.AddCoursesTaken(User.Identity?.Name!, newCoursesTakenRequest.CoursesTaken);
        await _transactionManager.Commit();
        return _mapper.Map<IEnumerable<CoursesTakenDTO>>(result);
    }

    [Authorize]
    [HttpGet("/CoursesTaken")]
    public async Task<IEnumerable<CoursesTakenDTO>> GetStudentCoursesTaken()
    {
        var result = await _studentService.GetCoursesTaken(User.Identity?.Name!);
        return _mapper.Map<IEnumerable<CoursesTakenDTO>>(result);
    }

    [Authorize]
    [HttpDelete("/CoursesTaken")]
    public async Task<IEnumerable<CoursesTakenDTO>> RemoveStudentCoursestaken(
        [FromBody] RemoveCoursesTakenRequest newRemoveCoursesTakenRequest
    )
    {
        var removed  = await _studentService.RemoveCoursesTaken(User.Identity?.Name!, newRemoveCoursesTakenRequest.CoursesTakenIds);
        await _transactionManager.Commit();
        return _mapper.Map<IEnumerable<CoursesTakenDTO>>(removed);
    }
}