using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface IPreEnrollmentRepository
{
    Task<IEnumerable<PreEnrollment>> GetByStudentIdComplete(int studentId);
}