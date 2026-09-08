using HybridOnionCleanTemplate.Application.Abstractions.Services;
using HybridOnionCleanTemplate.Application.Services.Example;
using Microsoft.Extensions.DependencyInjection;

namespace HybridOnionCleanTemplate.Application
{
    public static class DependencyInjection
    {

        public static void AddApplication(this IServiceCollection services)
        {
            services.AddTransient<IExampleService, ExampleService>();
        }
    }
}
