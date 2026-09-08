using SingleProjectWebTemplate.Domain.Entities;

namespace SingleProjectWebTemplate.Application.ViewModels.Example
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
