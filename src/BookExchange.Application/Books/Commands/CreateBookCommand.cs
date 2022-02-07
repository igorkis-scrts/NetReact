using BookExchange.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookExchange.Application.Books.Commands
{
     public class CreateBookCommand : IRequest<Book>
     {
          [Required]
          public string Title { get; set; }
          
          [Required]
          [StringLength(13, MinimumLength = 9, ErrorMessage = "Invalid ISBN length")]
          public string Isbn { get; set; }
          
          [Required]
          public string ShortDescription { get; set; }
          
          public string Description { get; set; }
          
          [Required]
          public string Publisher { get; set; }
          
          [Required]
          public int? PageCount { get; set; }
          
          [Required]
          public int? PublishedYear { get; set; }
          
          [Required]
          public List<int> AuthorIds { get; set; }
          
          [Required]
          public List<int> CategoryIds { get; set; }
          
          [Required]
          public IFormFile Image { get; set; }
     }
}
