namespace PreEnrollmentMgmt.Core.Exceptions;

public class InvalidPreEnrollmentSelectionException : Exception
{
    public InvalidPreEnrollmentSelectionException(string message)
        : base(message)
    {
    }

    public InvalidPreEnrollmentSelectionException(string message, Exception inner)
        : base(message, inner)
    {
    }
}