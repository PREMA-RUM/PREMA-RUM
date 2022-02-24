namespace PreEnrollmentMgmt.Core.Repositories;

public interface ITransactionManager
{
    Task Commit();
}