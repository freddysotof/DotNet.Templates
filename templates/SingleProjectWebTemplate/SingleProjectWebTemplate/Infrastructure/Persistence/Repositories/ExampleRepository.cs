using GenericRepository.Repositories;
using SingleProjectWebTemplate.Application.Abstractions.Persistence.Repositories;
using SingleProjectWebTemplate.Domain.Entities;
using SingleProjectWebTemplate.Infrastructure.Persistence.Contexts.Example;

namespace SingleProjectWebTemplate.Infrastructure.Persistence.Repositories
{
    public class ExampleRepository : BaseEntityRepository<ExampleEntity, ExampleContext>, IExampleRepository
    {
        public ExampleRepository(IHttpContextAccessor httpContextAccessor, ExampleContext context)
            : base(httpContextAccessor, context)
        {

        }
    }
}
