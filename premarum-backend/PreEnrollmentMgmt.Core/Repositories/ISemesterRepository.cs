using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface ISemesterRepository
{
    public Task<Semester?> GetByIdComplete(int id);
}