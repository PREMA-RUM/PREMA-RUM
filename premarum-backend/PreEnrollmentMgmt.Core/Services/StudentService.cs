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

    public async Task<Student> GetOrCreateStudent(string studentEmail)
    {
        Student? student;
        student = await _studentRepository.GetByEmailSimple(studentEmail);
        if (student == null)
        {
            student = new Student(studentEmail);
            await _studentRepository.Create(student);
        }
        return student;
    }
    public async Task UpdateDepartment(string studentEmail, int newDepartmentId)
    {
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        student.DepartmentId = newDepartmentId;
        _studentRepository.Save(student);
    }

    public async Task<IEnumerable<CoursesTaken>> AddCoursesTaken(string studentEmail, CoursesTaken[] coursesTaken)
    {
        var student = await _studentValidationService.ValidateStudentExists(studentEmail, true);
        foreach (var course in coursesTaken)
        {
            if(!student.CoursesTaken.Contains(course))
                student.AddCoursesTaken(course);
        }
        return student.CoursesTaken;
    }
    
    public async Task<IEnumerable<CoursesTaken>> RemoveCoursesTaken(string studentEmail,int[] courseIds )
    {
        if (courseIds is {Length: > 7})
            throw new InvalidCourseTakenDeletionException("Cannot remove more than 7 courses taken at a time");
                
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        var deleted = student.RemoveCoursesTaken(courseIds);
        return deleted;
    }

    public async Task<IEnumerable<CoursesTaken>> GetCoursesTaken(string studentEmail)
    {
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        return student.CoursesTaken;
    }
}