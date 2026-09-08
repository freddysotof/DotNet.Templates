using Resources.Interfaces;
using HybridOnionCleanApiTemplate.Application.ViewModels.Example;

namespace HybridOnionCleanApiTemplate.Application.Abstractions.Services
{
    public interface IExampleService : IGenericService<GetExample, CreateExample, UpdateExample>
    {
    }
}
