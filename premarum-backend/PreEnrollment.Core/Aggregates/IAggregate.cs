namespace PreEnrollment.Core.Aggregates;

public interface IAggregate
{
    protected void RaiseEvent(IDomainEvent @event);
}