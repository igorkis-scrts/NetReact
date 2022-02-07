using NetReact.Domain.DTOs;
using NetReact.Domain.Models;
using NetReact.Domain.Parameters;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using NetReact.Application.Common;

namespace NetReact.Domain.Queries
{
     public class GetBooksQuery : PaginatedQueryBase<BookDto>
     {
          public bool IncludeDetails { get; set; }
          public bool IncludeAuthors { get; set; }
          public bool IncludeCategories { get; set; }
          public bool IncludeWishedBy { get; set; }

          public string Isbn { get; set; }
          public string Title { get; set; }
          public List<int> Authors { get; set; }
          public List<int> Categories { get; set; }
          public string Publisher { get; set; }
          public string Description { get; set; }
          public int? PublishedYear { get; set; }
          public int? PageCount { get; set; }
          public int? MinPageCount { get; set; }
          public int? MaxPageCount { get; set; } 

     }
}
