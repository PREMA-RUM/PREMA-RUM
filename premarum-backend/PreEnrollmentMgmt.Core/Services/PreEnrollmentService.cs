using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Exceptions;
using PreEnrollmentMgmt.Core.Repositories;

namespace PreEnrollmentMgmt.Core.Services;

public class PreEnrollmentService
{
    private readonly IPreEnrollmentRepository _preEnrollmentRepository;
    private readonly ISemesterOfferRepository _semesterOfferRepository;
    private readonly IStudentRepository _studentRepository;

    public PreEnrollmentService(IPreEnrollmentRepository preEnrollmentRepository,
        ISemesterOfferRepository semesterOfferRepository, IStudentRepository studentRepository)
    {
        _preEnrollmentRepository = preEnrollmentRepository;
        _semesterOfferRepository = semesterOfferRepository;
        _studentRepository = studentRepository;
    }

    public async Task<IEnumerable<SemesterOffer>> AddSelectionToPreEnrollment(int preEnrollmentId, string studentEmail,
        int[] courseOfferings)
    {
        if (courseOfferings is {Length: > 5})
            throw new InvalidPreEnrollmentSelectionException("Cannot insert more than 5 selections at a time");

        var student = await _studentRepository.GetByEmailSimple(studentEmail);
        if (student == null)
            throw new StudentNotFoundException("No student found with specified email");

        var preEnrollment = await _preEnrollmentRepository.GetByIdWithSemesterOffersSimple(preEnrollmentId);

        if (preEnrollment == null)
            throw new InvalidPreEnrollmentSelectionException("PreEnrollment Not Found");
        if (!preEnrollment.CanBeChangedByStudent(student))
            throw new InvalidPreEnrollmentSelectionException("Student cannot change PreEnrollment");

        var semesterOffers = await _semesterOfferRepository.GetByIdList(courseOfferings);

        if (semesterOffers.Count() < courseOfferings.Length)
            throw new InvalidPreEnrollmentSelectionException("Some selected course offerings to add do not exist");

        foreach (var semesterOffer in semesterOffers)
        {
            preEnrollment.ValidateSelection(semesterOffer);
            preEnrollment.AddSelection(semesterOffer);
        }

        _preEnrollmentRepository.Save(preEnrollment);
        return semesterOffers;
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
}