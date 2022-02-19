using PreEnrollment.Core.Aggregates.SemesterOfferAggregate;

namespace PreEnrollment.Core.Aggregates.PreEnrollmentAggregate;

public class PreEnrollment: Aggregate
{
    public PreEnrollment(long? id, string name, long studentId, long semesterId)
    {
        Id = id;
        Name = name;
        StudentId = studentId;
        SemesterId = semesterId;
        SelectionIds = new HashSet<PreEnrollmentSelection>();
    }
    
    public PreEnrollment(long? id, string name, long studentId, long semesterId, IEnumerable<PreEnrollmentSelection> selections)
        :this(id, name, studentId, semesterId)
    {
        SelectionIds = new HashSet<PreEnrollmentSelection>(selections);
    }

    public long? Id { get; private set; }
    public string Name { get; private set; }
    public long StudentId { get; private set; }
    public long SemesterId { get; private set; }
    public IEnumerable<PreEnrollmentSelection> SelectionIds { get; private set; }
}
