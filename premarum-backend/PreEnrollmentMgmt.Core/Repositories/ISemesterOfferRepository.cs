using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.Repositories;

public interface ISemesterOfferRepository
{
    Task<IEnumerable<SemesterOffer>> GetByIdList(int[] ids);
}