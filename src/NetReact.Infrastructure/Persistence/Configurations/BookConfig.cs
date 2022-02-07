using NetReact.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NetReact.Infrastructure.Persistence.Configurations
{
     public class BookConfig : IEntityTypeConfiguration<Book>
     {
          public void Configure(EntityTypeBuilder<Book> builder)
          {
               builder.HasIndex(b => b.Isbn)
                    .IsUnique();

               builder.Property(x => x.Isbn)
                    .HasColumnType("varchar")
                    .HasMaxLength(13);

               builder.Property(x => x.Title)
                    .IsRequired()
                    .HasMaxLength(100);

               builder.Property(x => x.Isbn)
                    .IsRequired()
                    .HasMaxLength(13);
               
               builder.HasMany(x => x.Authors)
                    .WithMany(x => x.Books)
                    .UsingEntity<BookAuthor>(
                         x => x.HasOne(x => x.Author).WithMany(),
                         x => x.HasOne(x => x.Book).WithMany(x => x.BookAuthor)
                    );

               builder.HasMany(x => x.Categories)
                    .WithMany(x => x.Books)
                    .UsingEntity<BookCategory>(
                         x => x.HasOne(x => x.Category).WithMany().HasForeignKey(b => b.CategoryId),
                         x => x.HasOne(x => x.Book).WithMany().HasForeignKey(b => b.BookId)
                    ); 
          }
     }
}
