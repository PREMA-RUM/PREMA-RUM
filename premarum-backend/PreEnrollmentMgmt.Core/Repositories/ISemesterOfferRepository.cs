using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface ISemesterOfferRepository
{
    Task<IEnumerable<SemesterOffer>> GetByIdList(int[] ids);
    Task<Semester?> GetAvailableSemesterById(int id);
    Task<IEnumerable<Semester>> GetAvailableSemesters();
    Task<IEnumerable<Department>> GetAvailableDepartments();
    Task<IEnumerable<Course>> GetAvailableCourses();
}