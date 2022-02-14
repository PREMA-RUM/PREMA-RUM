using PreEnrollment.Core.Aggregates.SemesterOfferAggregate.SemesterEntity;
using PreEnrollment.Core.Aggregates.SemesterOfferAggregate.TimeSlotObject;

namespace PreEnrollment.Core.Aggregates.SemesterOfferAggregate;

public class SemesterOffer: Aggregate
{
    public SemesterOffer(long id, string sectionName, int capacity, Semester semester, Course course, IEnumerable<TimeSlot> timeSlots, IEnumerable<Professor> professors)
    {
        // TODO: Add Validation
        Id = id;
        SectionName = sectionName;
        Capacity = capacity;
        Semester = semester;
        Course = course;
        TimeSlots = timeSlots;
        Professors = professors;
    } 

    public long Id { get; private set; }
    public string SectionName { get; private set; }
    public int Capacity { get; private set; }

    public Semester Semester { get; private set; }
    public Course Course { get; private set; }
    public IEnumerable<TimeSlot> TimeSlots { get; private set; }
    public IEnumerable<Professor> Professors { get; private set; }
}
