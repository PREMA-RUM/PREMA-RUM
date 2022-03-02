using PreEnrollmentMgmt.Core.Entities;

namespace PreEnrollmentMgmt.Core.ValueObjects;

public class Overlaps
{
    public Overlaps(SemesterOffer offering1, SemesterOffer offering2)
    {
        this.Offering1 = offering1;
        this.Offering2 = offering2;
    }
    public SemesterOffer Offering1 { get; private set; }
    public SemesterOffer Offering2 { get; private set; }

    public override string ToString()
    {
        return
            $"{Offering1.Course.CourseName}-{Offering1.SectionName} overlaps with {Offering2.Course.CourseName}-{Offering2.SectionName}";
    }
}