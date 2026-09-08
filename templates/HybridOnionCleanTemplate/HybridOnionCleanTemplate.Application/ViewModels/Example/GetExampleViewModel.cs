using HybridOnionCleanTemplate.Domain.Entities;

namespace HybridOnionCleanTemplate.Application.ViewModels.Example
{
    public class GetExampleViewModel
    {

        public static implicit operator GetExampleViewModel(ExampleEntity entity)
        {
            return new GetExampleViewModel
            {
            };
        }
    }
}
