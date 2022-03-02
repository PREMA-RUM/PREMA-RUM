using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Exceptions;
using PreEnrollmentMgmt.Core.Repositories;
using PreEnrollmentMgmt.Core.ValueObjects;
using PreEnrollmentMgmt.Core.ValueObjects.Warnings;

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
            throw new InvalidPreEnrollmentSelectionException("Cannot insert more than 5 selections at a time");

        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);

        var student = await _studentValidationService.ValidateStudentExists(studentEmail);

        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new InvalidPreEnrollmentSelectionException("Student cannot change PreEnrollment");

        var semesterOffers = await _semesterOfferRepository.GetByIdList(courseOfferings);

        if (semesterOffers.Count() < courseOfferings.Length)
            throw new InvalidPreEnrollmentSelectionException("Some selected course offerings to add do not exist");

        foreach (var semesterOffer in semesterOffers)
            preEnrollment.AddSelection(semesterOffer);

        _preEnrollmentRepository.Save(preEnrollment);
        return semesterOffers;
    }

    public async Task RemoveSelectionFromPreEnrollment(int preEnrollmentId, string studentEmail,
        int[] courseOfferings)
    {
        if (courseOfferings is {Length: > 7})
            throw new InvalidPreEnrollmentSelectionException("Cannot remove more than 5 selections at a time");

        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);

        var student = await _studentValidationService.ValidateStudentExists(studentEmail);

        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new InvalidPreEnrollmentSelectionException("Student cannot change PreEnrollment");

        if (preEnrollment.Selections.Count < courseOfferings.Length)
            throw new InvalidPreEnrollmentSelectionException("Cannot remove more selections than what are available");

        preEnrollment.RemoveSelections(courseOfferings);
        _preEnrollmentRepository.Save(preEnrollment);
    }

    public async Task<PreEnrollment> CreateNewPreEnrollment(string studentEmail, string name, int semesterId)
    {
        var student = await _studentValidationService.ValidateStudentExists(studentEmail);
        await _semesterValidationService.ValidateSemesterExists(semesterId);
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
            throw new StudentNotFoundException("No student found with specified email");
        var preEnrollments = await _preEnrollmentRepository
            .GetByStudentIdComplete(student.Id);
        return preEnrollments;
    }

    public async Task UpdateName(int preEnrollmentId, string studentEmail, string newName)
    {
        var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId);

        var student = await _studentValidationService.ValidateStudentExists(studentEmail);

        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new InvalidPreEnrollmentSelectionException("Student cannot change PreEnrollment");

        preEnrollment.Name = newName;
        _preEnrollmentRepository.Save(preEnrollment);
    }

    public async Task<PreEnrollment> ValidatePreEnrollmentExists(int preEnrollmentId, bool fetchComplete = false)
    {
        PreEnrollment? preEnrollment;
        if (fetchComplete)
            preEnrollment = await _preEnrollmentRepository.GetByIdWithSemesterOffersComplete(preEnrollmentId);
        else
            preEnrollment = await _preEnrollmentRepository.GetByIdWithSemesterOffersSimple(preEnrollmentId);
        if (preEnrollment == null)
            throw new PreEnrollmentNotFoundException("No PreEnrollment found with specified email");
        return preEnrollment;
    }

    public async Task<IEnumerable<PreEnrollmentWarning>> GetPreEnrollmentWarnings(int preEnrollmentId)
    {
        return await Task.Run(async () =>
        {
            var preEnrollment = await ValidatePreEnrollmentExists(preEnrollmentId, fetchComplete: true);
            var warningList = new List<PreEnrollmentWarning>();
            if (preEnrollment.HasMoreThan21Credits())
                warningList.Add(new PreEnrollmentWarning(
                        preEnrollmentId: preEnrollmentId,
                        message: "More than 21 Credits selected"
                    )
                );
            List<Overlaps> overlaps = await preEnrollment.GetOverlappingOfferings();
            warningList.AddRange(
                overlaps.Select(o => new PreEnrollmentWarning(
                        preEnrollmentId: preEnrollmentId,
                        message: o.ToString()!
                    )
                )
            );
            return warningList;
        });
    }

}