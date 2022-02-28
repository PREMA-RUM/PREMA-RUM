namespace PreEnrollmentMgmt.Core.Exceptions;

public class InvalidPreEnrollmentCreationException: Exception
{
    public InvalidPreEnrollmentCreationException(string message)
        : base(message)
    {
    }

    public InvalidPreEnrollmentCreationException(string message, Exception inner)
        : base(message, inner)
    {
    }
}