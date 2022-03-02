using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface IStudentRepository
{
    Task<Student?> GetByEmailSimple(string email);
    void Save(Student student);
}