using HybridOnionCleanApiTemplate.Application.Abstractions.Persistence.Repositories;
using HybridOnionCleanApiTemplate.Application.Abstractions.Services;
using HybridOnionCleanApiTemplate.Application.Services.Example.Projections;
using HybridOnionCleanApiTemplate.Application.ViewModels.Example;
using Microsoft.EntityFrameworkCore;

namespace HybridOnionCleanApiTemplate.Application.Services.Example
{
    public class ExampleService : IExampleService
    {
        private readonly IExampleRepository _repository;
        public ExampleService(IExampleRepository repository)
        {
            _repository = repository;
        }

        public async Task<GetExample> AddAsync(CreateExample create, CancellationToken cancellationToken = default)
        {
            return await _repository.AddAsync(create);
        }

        public async Task<bool> DeleteAsync(string id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteAsync(string id, string deletedBy, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _repository.DeleteAsync(id, cancellationToken);
        }

        public async Task<bool> DeleteAsync(int id, string deletedBy, CancellationToken cancellationToken = default)
        {
            return await _repository.DeleteAsync(id, deletedBy, cancellationToken);
        }

        public async Task<List<GetExample>> GetAllAsync(CancellationToken cancellationToken = default)
         => await _repository.Queryable(cancellationToken).AsQueryable()
                .Select(ExampleProjection.GetAll)
                .ToListAsync(cancellationToken);

        public Task<GetExample> GetByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<GetExample> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _repository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<GetExample> UpdateAsync(int id, UpdateExample update, CancellationToken cancellationToken = default)
        {
            return await _repository.UpdateAsync(id, update, cancellationToken);
        }

        public Task<GetExample> UpdateAsync(string id, UpdateExample update, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
