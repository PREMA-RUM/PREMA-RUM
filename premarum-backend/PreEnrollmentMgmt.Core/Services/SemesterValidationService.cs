using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Exceptions;
using PreEnrollmentMgmt.Core.Repositories;

namespace PreEnrollmentMgmt.Core.Services;

public class SemesterValidationService
{
    private readonly ISemesterRepository _semesterRepository;

    public SemesterValidationService(ISemesterRepository semesterRepository)
    {
        _semesterRepository = semesterRepository;
    }

    public async Task<Semester> ValidateSemesterExists(int semesterId)
    {
        var result = await _semesterRepository.GetByIdComplete(semesterId);
        if (result == null)
            throw new CoreException("Semester does not exist");
        return result;
    }
}
