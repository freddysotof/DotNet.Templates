using HybridOnionCleanApiTemplate.Domain.Entities;

namespace HybridOnionCleanApiTemplate.Application.ViewModels.Example
{
    public class GetExample
    {

        public static implicit operator GetExample(ExampleEntity entity)
        {
            return new GetExample
            {
            };
        }
    }
}
