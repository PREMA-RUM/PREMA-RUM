namespace PreEnrollmentMgmt.Core.Exceptions;

public class CoreException: Exception
{
    public CoreException(string message)
        : base(message)
    {
    }

    public CoreException(string message, Exception inner)
        : base(message, inner)
    {
    }
}