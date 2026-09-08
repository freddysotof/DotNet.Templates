using Resources.Interfaces;
using SingleProjectWebTemplate.Application.ViewModels.Example;

namespace SingleProjectWebTemplate.Application.Abstractions.Services
{
    public interface IExampleService : IGenericService<GetExampleViewModel, CreateExampleViewModel, UpdateExampleViewModel>
    {
    }
}
