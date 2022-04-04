using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface ICourseRepository
{
    Task<IEnumerable<Course>> GetByIdList(int[] ids);
    Task<IEnumerable<Course>> GetBySimpleCourseTakenList(SimpleCourseTaken[] coursesTaken);
}