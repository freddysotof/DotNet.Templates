using SingleProjectWebTemplate.Application.Services.Example.Projections;
using Microsoft.EntityFrameworkCore;
using SingleProjectWebTemplate.Application.Abstractions.Services;
using SingleProjectWebTemplate.Application.ViewModels.Example;
using SingleProjectWebTemplate.Application.Abstractions.Persistence.Repositories;

namespace SingleProjectWebTemplate.Application.Services.Example
{
    public class ExampleService : IExampleService
    {
        private readonly IExampleRepository _repository;
        public ExampleService(IExampleRepository repository)
        {
            _repository = repository;
        }

        public async Task<GetExampleViewModel> AddAsync(CreateExampleViewModel create, CancellationToken cancellationToken = default)
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

        public async Task<List<GetExampleViewModel>> GetAllAsync(CancellationToken cancellationToken = default)
         => await _repository.Queryable(cancellationToken).AsQueryable()
                .Select(ExampleProjection.GetAll)
                .ToListAsync(cancellationToken);

        public Task<GetExampleViewModel> GetByIdAsync(string id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<GetExampleViewModel> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _repository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<GetExampleViewModel> UpdateAsync(int id, UpdateExampleViewModel update, CancellationToken cancellationToken = default)
        {
            return await _repository.UpdateAsync(id, update, cancellationToken);
        }

        public Task<GetExampleViewModel> UpdateAsync(string id, UpdateExampleViewModel update, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
