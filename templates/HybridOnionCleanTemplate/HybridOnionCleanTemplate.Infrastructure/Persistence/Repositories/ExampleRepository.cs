
using GenericRepository.Repositories;
using HybridOnionCleanTemplate.Application.Abstractions.Persistence.Repositories;
using HybridOnionCleanTemplate.Domain.Entities;
using HybridOnionCleanTemplate.Infrastructure.Persistence.Contexts.Example;
using Microsoft.AspNetCore.Http;

namespace HybridOnionCleanTemplate.Infrastructure.Persistence.Repositories
{
    public class ExampleRepository : BaseEntityRepository<ExampleEntity, ExampleContext>, IExampleRepository
    {
        public ExampleRepository(IHttpContextAccessor httpContextAccessor, ExampleContext context)
            : base(httpContextAccessor, context)
        {

        }
    }
}
