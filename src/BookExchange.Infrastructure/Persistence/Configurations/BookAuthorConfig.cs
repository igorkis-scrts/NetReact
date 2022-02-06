using BookExchange.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookExchange.Infrastructure.Persistence.Configurations
{
     class BookAuthorConfig : IEntityTypeConfiguration<BookAuthor>
     {
          public void Configure(EntityTypeBuilder<BookAuthor> builder)
          {
               builder.HasOne(b => b.Book)
                    .WithMany(b => b.BookAuthor)
                    .HasForeignKey(b => b.BookId)
                    .OnDelete(DeleteBehavior.Cascade);

               builder.HasOne(b => b.Author)
                    .WithMany()
                    .HasForeignKey(b => b.AuthorId)
                    .OnDelete(DeleteBehavior.Cascade);
          }
     }
}
