using Microsoft.EntityFrameworkCore;

namespace SingleProjectWebTemplate.Infrastructure.Persistence.Contexts.Example
{

    public partial class ExampleContext : DbContext
    {
        public ExampleContext()
        {
        }

        public ExampleContext(DbContextOptions<ExampleContext> options)
            : base(options)
        {
        }
    }
}
