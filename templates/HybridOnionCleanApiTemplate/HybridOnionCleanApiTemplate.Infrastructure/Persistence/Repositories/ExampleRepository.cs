
using GenericRepository.Repositories;
using HybridOnionCleanApiTemplate.Application.Abstractions.Persistence.Repositories;
using HybridOnionCleanApiTemplate.Domain.Entities;
using HybridOnionCleanApiTemplate.Infrastructure.Persistence.Contexts.Example;
using Microsoft.AspNetCore.Http;

namespace HybridOnionCleanApiTemplate.Infrastructure.Persistence.Repositories
{
    public class ExampleRepository : BaseEntityRepository<ExampleEntity, ExampleContext>, IExampleRepository
    {
        public ExampleRepository(IHttpContextAccessor httpContextAccessor, ExampleContext context)
            : base(httpContextAccessor, context)
        {

        }
    }
}
