using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Exceptions;
namespace PreEnrollmentMgmt.Core.Services;

public class StudentValidationService
{
    private readonly IStudentRepository _studentRepository;
    
    public StudentValidationService(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }
    
    public async Task<Boolean> ValidateStudentExists(string studentEmail)
    {
        var student = await _studentRepository.GetByEmailSimple(studentEmail);
        if (student == null)
            throw new StudentNotFoundException("No student found with specified email");
        return true;
    }
    
    public async Task<Boolean> ValidateStudentCanModify(string studentEmail, int preEnrollmentId)
    {
        var student = await _studentRepository.GetByEmailSimple(studentEmail);
        if (student == null)
            throw new StudentNotFoundException("No student found with specified email");
        return student.Id == preEnrollmentId;
    }
    
}