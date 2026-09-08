using HybridOnionCleanTemplate.Domain.Entities;

namespace HybridOnionCleanTemplate.Application.ViewModels.Example
{
    public class CreateExampleViewModel
    {
        public static implicit operator ExampleEntity(CreateExampleViewModel create)
        {
            return new ExampleEntity
            {
            };
        }
    }
}
