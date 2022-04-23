namespace PreEnrollmentMgmt.Core.Entities.ComputedEntities;

public class RankedSemesterOffer
{
    public float Rank { get; set; }
    public int SemesterOfferId { get; set; }
    public SemesterOffer SemesterOffer { get; set; }
}