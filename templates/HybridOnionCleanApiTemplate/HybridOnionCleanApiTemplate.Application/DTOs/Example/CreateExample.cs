using HybridOnionCleanApiTemplate.Domain.Entities;

namespace HybridOnionCleanApiTemplate.Application.ViewModels.Example
{
    public class CreateExample
    {
        public static implicit operator ExampleEntity(CreateExample create)
        {
            return new ExampleEntity
            {
            };
        }
    }
}
