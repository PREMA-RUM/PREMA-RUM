using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Exceptions;
using PreEnrollmentMgmt.Core.Repositories;

namespace PreEnrollmentMgmt.Core.Services;

public class StudentValidationService
{
    private readonly IStudentRepository _studentRepository;

    public StudentValidationService(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }

    public async Task<Student> ValidateStudentExists(string studentEmail, bool fetchStudentWithTakenCourses = false)
    {
        Student? student;

        if (fetchStudentWithTakenCourses)
            student = await _studentRepository.GetByEmailWithCoursesTaken(studentEmail);
        else
            student = await _studentRepository.GetByEmailSimple(studentEmail);
        if (student == null)
            throw new CoreException("No student found with specified email");
        return student;
    }

    public async Task<Student> ValidateStudentExistIncludePreEnrollments(string studentEmail)
    {
        var student = await _studentRepository.GetByEmailWithPreEnrollmentsSimple(studentEmail);
        if (student == null)
            throw new CoreException("No student found with specified email");
        return student;
    }
}