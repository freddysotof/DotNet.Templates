using SingleProjectWebTemplate.Domain.Entities;

namespace SingleProjectWebTemplate.Application.ViewModels.Example
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
