namespace PreEnrollment.Core.Aggregates;

public abstract class Aggregate
{
    public IEnumerable<IDomainEvent> Events { get; private set; } = new List<IDomainEvent>();
    
    // Only aggregates can raise events
    protected void RaiseEvent(IDomainEvent @event)
    {
        ((List<IDomainEvent>) Events).Add(@event);
    }
}