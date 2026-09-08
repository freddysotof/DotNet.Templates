using HybridOnionCleanTemplate.Application.ViewModels.Example;
using HybridOnionCleanTemplate.Domain.Entities;
using System.Linq.Expressions;

namespace HybridOnionCleanTemplate.Application.Services.Example.Projections
{
    public static class ExampleProjection
    {
        public static Expression<Func<ExampleEntity, GetExampleViewModel>> GetAll { get; } = element =>
           new GetExampleViewModel
           {
           };
    }
}
