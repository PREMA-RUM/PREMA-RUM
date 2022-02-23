using PreEnrollmentMgmt.Core.Entities;
using PreEnrollmentMgmt.Core.Repositories;

namespace PreEnrollmentMgmt.Core.Services;

public class PreEnrollmentService
{
    private readonly IPreEnrollmentRepository _preEnrollmentRepository;
    private readonly ISemesterOfferRepository _semesterOfferRepository;
    private readonly IStudentRepository _studentRepository;

    public PreEnrollmentService(IPreEnrollmentRepository preEnrollmentRepository, ISemesterOfferRepository semesterOfferRepository, IStudentRepository studentRepository)
    {
        _preEnrollmentRepository = preEnrollmentRepository;
        _semesterOfferRepository = semesterOfferRepository;
        _studentRepository = studentRepository;
    }

    public async Task<IEnumerable<SemesterOffer>> AddSelectionFromPreEnrollment(int preEnrollmentId, string studentEmail, int[] courseOfferings)
    {
        if (courseOfferings is {Length: > 5})
            throw new ApplicationException("Cannot insert more than 5 slections at a time");
        var preEnrollment = await _preEnrollmentRepository
            .GetByIdWithSemesterOffersSimple(preEnrollmentId);
        var student = await _studentRepository.GetByEmailSimple(studentEmail);
        
        if (preEnrollment == null)
            throw new ApplicationException("PreEnrollment Not Found");
        if (!preEnrollment.CanBeChangedByStudent(student.Id))
            throw new ApplicationException("Student cannot change preenrollment");

        var semesterOffers = await _semesterOfferRepository.GetByIdList(courseOfferings);
        
        if (semesterOffers.Count() < courseOfferings.Length)
            throw new ApplicationException("Some selected course offerings to add do not exist");
        
        foreach (var semesterOffer in semesterOffers)
        {
            preEnrollment.ValidateSelection(semesterOffer);
            preEnrollment.AddSelection(semesterOffer);
        }

        _preEnrollmentRepository.Save(preEnrollment);
        return semesterOffers;
    }  
}