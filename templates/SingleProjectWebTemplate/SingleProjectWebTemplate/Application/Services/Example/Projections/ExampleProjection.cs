using SingleProjectWebTemplate.Application.ViewModels.Example;
using SingleProjectWebTemplate.Domain.Entities;
using System.Linq.Expressions;

namespace SingleProjectWebTemplate.Application.Services.Example.Projections
{
    public static class ExampleProjection
    {
        public static Expression<Func<ExampleEntity, GetExampleViewModel>> GetAll { get; } = element =>
           new GetExampleViewModel
           {
           };
    }
}
