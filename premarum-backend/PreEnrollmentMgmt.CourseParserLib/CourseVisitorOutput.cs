namespace PreEnrollmentMgmt.CourseParserLib;

public class CourseVisitorOutput
{
    public CourseVisitorOutput(string? value, Valuetype type, bool carryResult)
    {
        Value = value;
        Type = type;
        CarryResult = carryResult;
    }
    public string? Value { get; private set; }
    public Valuetype Type { get; private set; }
    public bool CarryResult { get; private set; }
}