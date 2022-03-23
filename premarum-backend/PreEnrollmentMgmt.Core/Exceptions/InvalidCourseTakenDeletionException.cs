namespace PreEnrollmentMgmt.Core.Exceptions;

public class InvalidCourseTakenDeletionException : Exception
{
    public InvalidCourseTakenDeletionException(string message)
        : base(message)
    {
    }

    public InvalidCourseTakenDeletionException(string message, Exception inner)
        : base(message, inner)
    {
    }
}