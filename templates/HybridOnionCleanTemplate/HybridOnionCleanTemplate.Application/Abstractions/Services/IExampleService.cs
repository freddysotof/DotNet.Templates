using Resources.Interfaces;
using HybridOnionCleanTemplate.Application.ViewModels.Example;

namespace HybridOnionCleanTemplate.Application.Abstractions.Services
{
    public interface IExampleService : IGenericService<GetExampleViewModel, CreateExampleViewModel, UpdateExampleViewModel>
    {
    }
}
