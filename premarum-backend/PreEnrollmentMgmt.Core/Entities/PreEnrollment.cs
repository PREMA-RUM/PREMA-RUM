using PreEnrollmentMgmt.Core.Exceptions;

namespace PreEnrollmentMgmt.Core.Entities;

public class PreEnrollment
{
    public PreEnrollment()
    {
        Selections = new HashSet<SemesterOffer>();
    }

    public PreEnrollment(string name, int semesterId, int studentId)
    {
        Name = name;
        SemesterId = semesterId;
        StudentId = studentId;
    }

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int StudentId { get; set; }
    public int SemesterId { get; set; }
    public Semester Semester { get; set; } = null!;
    public ICollection<SemesterOffer> Selections { get; set; }
    public bool CanBeChangedByStudent(Student? student)
    {
        return student != null && StudentId == student.Id;
    }
    public void AddSelection(SemesterOffer newSelection)
    {
        ValidateSelection(newSelection);
        ((HashSet<SemesterOffer>) Selections).Add(newSelection);
    }

    private void ValidateSelection(SemesterOffer selectionCandidate)
    {
        if (SemesterId != selectionCandidate.Semester.Id)
            throw new InvalidPreEnrollmentSelectionException(
                "Semester offer must of the same semester as pre enrollment");
        if (Selections.Contains(selectionCandidate))
            throw new InvalidPreEnrollmentSelectionException("Semester offer must not already be selected");
    }

    public void RemoveSelections(int[] CourseOfferings)
    {
        ((HashSet<SemesterOffer>) Selections).RemoveWhere( so => CourseOfferings.Contains(so.Id));
    }
}