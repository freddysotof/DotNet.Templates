using GenericRepository.Interfaces;
using SingleProjectWebTemplate.Domain.Entities;

namespace SingleProjectWebTemplate.Application.Abstractions.Persistence.Repositories
{
    public interface IExampleRepository : IBaseEntityRepository<ExampleEntity>
    {
    }
}
