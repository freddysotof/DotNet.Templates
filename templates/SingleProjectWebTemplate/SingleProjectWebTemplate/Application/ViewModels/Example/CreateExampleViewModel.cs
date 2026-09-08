using SingleProjectWebTemplate.Domain.Entities;

namespace SingleProjectWebTemplate.Application.ViewModels.Example
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
