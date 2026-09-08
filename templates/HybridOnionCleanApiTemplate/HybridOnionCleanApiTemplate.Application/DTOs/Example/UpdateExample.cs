using HybridOnionCleanApiTemplate.Domain.Entities;

namespace HybridOnionCleanApiTemplate.Application.ViewModels.Example
{
    public class UpdateExample
    {
        public static implicit operator ExampleEntity(UpdateExample create)
        {
            return new ExampleEntity
            {
            };
        }
    }
}
