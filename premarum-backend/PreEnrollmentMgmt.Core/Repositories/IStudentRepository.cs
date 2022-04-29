using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface IStudentRepository
{
    Task<Student?> GetByEmailSimple(string email);
    Task<Student?> GetByEmailWithCoursesTaken(string email);
    Task<Student?> GetByEmailWithPreEnrollmentsSimple(string email);
    Task Create(Student student);
    void Save(Student student);
}