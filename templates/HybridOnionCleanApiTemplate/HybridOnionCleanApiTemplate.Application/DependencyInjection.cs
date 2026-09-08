using HybridOnionCleanApiTemplate.Application.Abstractions.Services;
using HybridOnionCleanApiTemplate.Application.Services.Example;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace HybridOnionCleanApiTemplate.Application
{
    public static class DependencyInjection
    {

        public static void AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IExampleService, ExampleService>();
        }
    }
}
