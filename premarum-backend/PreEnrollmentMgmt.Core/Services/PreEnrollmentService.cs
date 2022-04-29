using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Entities.ComputedEntities;
using PreEnrollmentMgmt.Core.Exceptions;
using PreEnrollmentMgmt.Core.Repositories;

namespace PreEnrollmentMgmt.Core.Services;

public class PreEnrollmentService
{
    private readonly IPreEnrollmentRepository _preEnrollmentRepository;
    private readonly ISemesterOfferRepository _semesterOfferRepository;
    private readonly IStudentRepository _studentRepository;
    private readonly SemesterValidationService _semesterValidationService;
    private readonly StudentValidationService _studentValidationService;

    public PreEnrollmentService(IPreEnrollmentRepository preEnrollmentRepository,
        ISemesterOfferRepository semesterOfferRepository, IStudentRepository studentRepository,
        SemesterValidationService semesterValidationService, StudentValidationService studentValidationService)
    {
        _preEnrollmentRepository = preEnrollmentRepository;
        _semesterOfferRepository = semesterOfferRepository;
        _studentRepository = studentRepository;
        _semesterValidationService = semesterValidationService;
        _studentValidationService = studentValidationService;
    }

    public async Task<IEnumerable<SemesterOffer>> AddSelectionToPreEnrollment(int preEnrollmentId, string studentEmail,
        int[] courseOfferings)
    {
        if (courseOfferings is {Length: > 7})
            throw new CoreException("Cannot insert more than 7 selections at a time");

        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);

        if (preEnrollment.HasReachedMaxSelectionCapacity() || preEnrollment.WillReachMaxCapacityAfterAddition(courseOfferings.Length))
            throw new CoreException(
                "Pre-Enrollment has reached its max selection capacity. You can always create another pre-enrollment."
            );
        
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);

        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new CoreException("Student cannot change PreEnrollment");

        var semesterOffers = await _semesterOfferRepository.GetByIdList(courseOfferings);

        if (semesterOffers.Count() < courseOfferings.Length)
            throw new CoreException("Some selected course offerings to add do not exist");

        foreach (var semesterOffer in semesterOffers)
            preEnrollment.AddSelection(semesterOffer);
        
        return semesterOffers;
    }

    public async Task RemoveSelectionFromPreEnrollment(int preEnrollmentId, string studentEmail,
        int[] courseOfferings)
    {
        if (courseOfferings is {Length: > 7})
            throw new CoreException("Cannot remove more than 7 selections at a time");

        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);

        var student = await _studentValidationService.ValidateStudentExists(studentEmail);

        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new CoreException("Student cannot change PreEnrollment");

        if (preEnrollment.Selections.Count < courseOfferings.Length)
            throw new CoreException("Cannot remove more selections than what are available");

        preEnrollment.RemoveSelections(courseOfferings);
        _preEnrollmentRepository.Save(preEnrollment);
    }

    public async Task<PreEnrollment> CreateNewPreEnrollment(string studentEmail, string name, int semesterId)
    {
        var student = await _studentValidationService.ValidateStudentExistIncludePreEnrollments(studentEmail);
        await _semesterValidationService.ValidateSemesterExists(semesterId);
        if (student.HasReachedMaxPreEnrollmentCapacity())
            throw new CoreException(
                "Student has reached max pre enrollment capacity. Consider deleting old pre-enrollments"
            );
        if (await _preEnrollmentRepository.ContainsWithNameStudentAndSemesterId(name, student.Id, semesterId))
            throw new CoreException("PreEnrollment With Given Name Already Exists In Selected Semester");
        var newPreEnrollment = new PreEnrollment(name, semesterId, student.Id);
        student.AddPreEnrollment(newPreEnrollment);
        return newPreEnrollment;
    }

    public async Task<IEnumerable<PreEnrollment>> GetStudentPreEnrollments(string studentEmail)
    {
        var student = await _studentRepository.GetByEmailSimple(studentEmail);
        if (student == null)
            throw new CoreException("No student found with specified email");
        var preEnrollments = await _preEnrollmentRepository
            .GetByStudentIdPartial(student.Id);
        return preEnrollments;
    }
    
    public async Task<PreEnrollment> GetStudentPreEnrollmentById(string studentEmail, int preEnrollmentId)
    {
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId, true);
        if (preEnrollment.CanBeChangedByStudent(student))
            return preEnrollment;
        throw new CoreException("Student cannot change PreEnrollment");
    }

    public async Task UpdateName(int preEnrollmentId, string studentEmail, string newName)
    {
        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);

        var student = await _studentValidationService.ValidateStudentExists(studentEmail);

        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new CoreException("Student cannot change PreEnrollment");

        preEnrollment.Name = newName;
    }

    public async Task<PreEnrollment> ValidatePreEnrollmentExists(int preEnrollmentId, bool fetchComplete = false)
    {
        PreEnrollment? preEnrollment;
        if (fetchComplete)
            preEnrollment = await _preEnrollmentRepository.GetByIdWithSemesterOffersComplete(preEnrollmentId);
        else
            preEnrollment = await _preEnrollmentRepository.GetByIdWithSemesterOffersSimple(preEnrollmentId);
        if (preEnrollment == null)
            throw new CoreException("No PreEnrollment found with specified email");
        return preEnrollment;
    }

    public async Task<IEnumerable<OverlappingPreEnrollmentSelections>> GetPreEnrollmentOverlaps(int preEnrollmentId)
    {
        return await _preEnrollmentRepository.GetConflictingSelections(preEnrollmentId);
    }

    public async Task DeletePreEnrollment(int preEnrollmentId, string studentEmail)
    {
        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new CoreException("Student cannot modify pre enrollment");
        _preEnrollmentRepository.DeletePreEnrollment(preEnrollment);
    }

    public async Task<IEnumerable<SemesterOffer>> GetPreEnrollmentRecommendations(int preEnrollmentId,
        string studentEmail)
    {
        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new CoreException("Student cannot modify pre enrollment");
        return await _preEnrollmentRepository.GetRecommendationsForPreEnrollment(preEnrollmentId);
    }
}