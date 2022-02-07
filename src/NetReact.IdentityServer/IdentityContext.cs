using NetReact.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace NetReact.IdentityServer
{
     public class IdentityContext : IdentityDbContext<ApplicationIdentityUser>
     {
          public IdentityContext(DbContextOptions options) : base(options)
          {
          }

          protected override void OnModelCreating(ModelBuilder builder)
          {
               base.OnModelCreating(builder);

               builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "admin", NormalizedName = "admin".ToUpper() });
               builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "user", NormalizedName = "user".ToUpper() });
          }
     }
}
