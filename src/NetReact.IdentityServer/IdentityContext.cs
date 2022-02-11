using System.Data.Common;
using NetReact.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace NetReact.IdentityServer
{
     public class IdentityContext : IdentityDbContext<ApplicationIdentityUser>
     {
          private readonly string _connectionString;
          private readonly DbConnection _connection;
          
          public IdentityContext(DbContextOptions options) : base(options)
          {
          }
          
          public IdentityContext(string connectionString)
          {
               _connectionString = connectionString;
          }

          public IdentityContext(DbConnection connection)
          {
               _connection = connection;
          }
          
          protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
          {
               if (optionsBuilder.IsConfigured) return;
               
               if (_connection != null)
               {
                    optionsBuilder.UseSqlServer(_connection);
               } else {
                    optionsBuilder.UseSqlServer(_connectionString);
               }
          }

          protected override void OnModelCreating(ModelBuilder builder)
          {
               base.OnModelCreating(builder);

               builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "admin", NormalizedName = "admin".ToUpper() });
               builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "user", NormalizedName = "user".ToUpper() });
          }
     }
}
