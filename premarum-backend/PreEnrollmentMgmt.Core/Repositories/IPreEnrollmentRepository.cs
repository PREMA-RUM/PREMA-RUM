using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.ComputedEntities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface IPreEnrollmentRepository
{
    Task<IEnumerable<PreEnrollment>> GetByStudentIdPartial(int studentId);
    Task<PreEnrollment> GetByIdWithSemesterOffersSimple(int preEnrollmentId);
    Task<PreEnrollment?> GetByIdWithSemesterOffersComplete(int preEnrollmentId);
    void Save(PreEnrollment preEnrollment);
    Task<bool> ContainsWithNameStudentAndSemesterId(string name, int studentId, int semesterId);
    Task<IEnumerable<OverlappingPreEnrollmentSelections>> GetConflictingSelections(int preEnrollmentId);
    void DeletePreEnrollment(PreEnrollment preEnrollment);
}