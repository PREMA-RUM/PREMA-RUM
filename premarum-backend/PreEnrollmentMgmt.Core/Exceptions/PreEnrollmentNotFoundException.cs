namespace PreEnrollmentMgmt.Core.Exceptions;

public class PreEnrollmentNotFoundException : Exception
{
    public PreEnrollmentNotFoundException(string message)
        : base(message)
    {
    }

    public PreEnrollmentNotFoundException(string message, Exception inner)
        : base(message, inner)
    {
    }
}