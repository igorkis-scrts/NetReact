using BookExchange.Domain.Models;
using BookExchange.Infrastructure.Persistence.Configurations;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Linq;

namespace BookExchange.Infrastructure.Persistence
{
     public class BookExchangeDbContext : DbContext
     {
          private readonly string _connectionString;
          private readonly DbConnection _connection;

          public DbSet<User> Users { get; set; }
          
          public DbSet<Post> Posts { get; set; }
          
          public DbSet<Book> Books { get; set; }
          
          public DbSet<Wishlist> Wishlist { get; set; }

          public DbSet<Bookmark> Bookmarks { get; set; }
          
          public DbSet<Author> Authors { get; set; }

          public BookExchangeDbContext(DbContextOptions<BookExchangeDbContext> options)
              : base(options)
          {
          }

          public BookExchangeDbContext(string connectionString)
          {
               _connectionString = connectionString;
          }

          public BookExchangeDbContext(DbConnection connection)
          {
               _connection = connection;
          }

          protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
          {
               if (!optionsBuilder.IsConfigured)
               {
                    if (_connection != null)
                    {
                         optionsBuilder.UseSqlServer(_connection);
                    } else {
                         optionsBuilder.UseSqlServer(_connectionString);
                    }
               }
          }

          protected override void OnModelCreating(ModelBuilder modelBuilder)
          {
               base.OnModelCreating(modelBuilder);
               
               modelBuilder.ApplyConfiguration(new AuthorConfig());
               modelBuilder.ApplyConfiguration(new UserConfig());
               modelBuilder.ApplyConfiguration(new UserContactConfig());
               modelBuilder.ApplyConfiguration(new PostConfig());
               modelBuilder.ApplyConfiguration(new BookConfig());
               modelBuilder.ApplyConfiguration(new BookDetailsConfig());
               modelBuilder.ApplyConfiguration(new BookAuthorConfig());
               modelBuilder.ApplyConfiguration(new CategoryConfig());
          }
     }
}
