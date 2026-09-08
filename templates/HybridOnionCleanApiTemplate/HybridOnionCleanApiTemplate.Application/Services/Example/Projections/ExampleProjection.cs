using HybridOnionCleanApiTemplate.Application.ViewModels.Example;
using HybridOnionCleanApiTemplate.Domain.Entities;
using System.Linq.Expressions;

namespace HybridOnionCleanApiTemplate.Application.Services.Example.Projections
{
    public static class ExampleProjection
    {
        public static Expression<Func<ExampleEntity, GetExample>> GetAll { get; } = element =>
           new GetExample
           {
           };
    }
}
