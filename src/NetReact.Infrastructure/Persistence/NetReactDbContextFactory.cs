using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace NetReact.Infrastructure.Persistence
{
     public class NetReactDbContextFactory : IDesignTimeDbContextFactory<NetReactDbContext>
     {
          public NetReactDbContext CreateDbContext(string[] args)
          {
               var optionsBuilder = new DbContextOptionsBuilder<NetReactDbContext>();
               IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                   .AddJsonFile("appsettings.json")
                   .Build();

               optionsBuilder
                    .UseSqlServer(configuration.GetConnectionString("NetReact"));

               return new NetReactDbContext(optionsBuilder.Options);
          }
     }
}
