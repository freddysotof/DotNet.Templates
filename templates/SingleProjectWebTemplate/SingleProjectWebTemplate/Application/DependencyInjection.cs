using SingleProjectWebTemplate.Application.Abstractions.Services;
using SingleProjectWebTemplate.Application.Services.Example;

namespace SingleProjectWebTemplate.Application
{
    public static class DependencyInjection
    {

        public static void AddApplication(this IServiceCollection services)
        {
            services.AddTransient<IExampleService, ExampleService>();
        }
    }
}
