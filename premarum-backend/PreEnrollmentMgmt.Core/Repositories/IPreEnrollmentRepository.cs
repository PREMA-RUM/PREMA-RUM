using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface IPreEnrollmentRepository
{
    Task<IEnumerable<PreEnrollment>> GetByStudentIdComplete(int studentId);
    Task<PreEnrollment> GetByIdWithSemesterOffersSimple(int preEnrollmentId);
    Task<PreEnrollment?> GetByIdWithSemesterOffersComplete(int preEnrollmentId);
    void Save(PreEnrollment preEnrollment);
    Task<bool> ContainsWithNameStudentAndSemesterId(string name, int studentId, int semesterId);
}