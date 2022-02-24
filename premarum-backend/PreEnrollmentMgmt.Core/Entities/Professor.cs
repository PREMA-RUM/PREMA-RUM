namespace PreEnrollmentMgmt.Core.Entities;

public class Professor
{
    public Professor()
    {
        OffersTeached = new HashSet<SemesterOffer>();
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public int DepartmentId { get; set; }

    public Department Department { get; set; } = null!;
    public ICollection<SemesterOffer> OffersTeached { get; set; }
}