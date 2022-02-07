using BookExchange.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BookExchange.Infrastructure.Persistence.Configurations
{
     public class BookDetailsConfig : IEntityTypeConfiguration<BookDetails>
     {
          public void Configure(EntityTypeBuilder<BookDetails> builder)
          {
               builder.Property(x => x.Publisher)
                    .HasMaxLength(100);
          }
     }
}
