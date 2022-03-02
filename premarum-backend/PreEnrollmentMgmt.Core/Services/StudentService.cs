using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Exceptions;
using PreEnrollmentMgmt.Core.Repositories;

namespace PreEnrollmentMgmt.Core.Services;

public class StudentService
{
    
    private readonly IStudentRepository _studentRepository;
    private readonly StudentValidationService _studentValidationService;

    public StudentService( IStudentRepository studentRepository,
        StudentValidationService studentValidationService)
    {
        _studentRepository = studentRepository;
        _studentValidationService = studentValidationService;
    }

    public async Task<Student> GetStudent(string studentEmail)
    {
        return await _studentValidationService.ValidateStudentExists(studentEmail);
    }
    public async Task UpdateDepartmentName(string studentEmail, int newName)
    {
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        student.ChangeDepartment(newName);
        _studentRepository.Save(student);
    }
}