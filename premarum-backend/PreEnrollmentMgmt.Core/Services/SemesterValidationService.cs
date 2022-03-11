using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Exceptions;
using PreEnrollmentMgmt.Core.Repositories;

namespace PreEnrollmentMgmt.Core.Services;

public class SemesterValidationService
{
    private readonly ISemesterOfferRepository _semesterOfferRepository;

    public SemesterValidationService(ISemesterOfferRepository semesterOfferRepository)
    {
        _semesterOfferRepository = semesterOfferRepository;
    }

    public async Task<Semester> ValidateSemesterExists(int semesterId)
    {
        var result = await _semesterOfferRepository.GetAvailableSemesterById(semesterId);
        if (result == null)
            throw new CoreException("Semester does not exist");
        return result;
    }
}
