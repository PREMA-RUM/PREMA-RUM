namespace PreEnrollment.Core.Aggregates;

// TODO: Change to async
public interface IRepository<T> where T : Aggregate
{
    void Save(T toSave);
    T GetById(long Id);
    protected void HandleEvents(IEnumerable<IDomainEvent> @events);
}
