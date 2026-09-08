using GenericRepository.Interfaces;
using HybridOnionCleanTemplate.Infrastructure.Persistence.Contexts.Example;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace HybridOnionCleanTemplate.Infrastructure
{
    public static class DependencyInjection
    {
        public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ExampleContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                options.EnableSensitiveDataLogging();

            }, ServiceLifetime.Transient);
           
            AddRepositoryToIoC(services, Assembly.GetExecutingAssembly());
        }


        private static void AddRepositoryToIoC(IServiceCollection services, Assembly assembly)
        {
            var repositories = assembly.GetTypes().Where(x => x.IsAssignableToGenericType(typeof(IBaseEntityRepository<>)) && !x.IsGenericType && !x.IsInterface);
            foreach (var item in repositories)
            {
                var @interface = item.GetInterfaces().FirstOrDefault(x => !x.IsGenericType) ?? throw new ArgumentNullException();
                services.AddScoped(@interface, item);
            }
        }
        //Function that checks whether a given type is implementing a generic interface
        private static bool IsAssignableToGenericType(this Type givenType, Type genericType)
        {
            return givenType.GetInterfaces().Any(t => t.IsGenericType && t.GetGenericTypeDefinition() == genericType) ||
                   givenType.BaseType != null && (givenType.BaseType.IsGenericType && givenType.BaseType.GetGenericTypeDefinition() == genericType ||
                                                  givenType.BaseType.IsAssignableToGenericType(genericType));
        }
    }
}
