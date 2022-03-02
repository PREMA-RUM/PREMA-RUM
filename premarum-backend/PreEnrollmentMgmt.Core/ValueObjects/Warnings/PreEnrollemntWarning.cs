namespace PreEnrollmentMgmt.Core.ValueObjects.Warnings;

public class PreEnrollmentWarning
{
    public PreEnrollmentWarning(string message, int preEnrollmentId)
    {
        Message = message;
        PreEnrollmentId = preEnrollmentId;
    }
    public int PreEnrollmentId { get; private set; }
    public string Message { get; private set; }
}