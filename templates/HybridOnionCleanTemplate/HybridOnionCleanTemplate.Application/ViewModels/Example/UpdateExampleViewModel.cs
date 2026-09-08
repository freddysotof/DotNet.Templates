using HybridOnionCleanTemplate.Domain.Entities;

namespace HybridOnionCleanTemplate.Application.ViewModels.Example
{
    public class UpdateExampleViewModel
    {
        public static implicit operator ExampleEntity(UpdateExampleViewModel create)
        {
            return new ExampleEntity
            {
            };
        }
    }
}
