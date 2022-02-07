using NetReact.Domain.DTOs;
using NetReact.Domain.Models;
using NetReact.Domain.Queries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetReact.Application.Common;

namespace NetReact.Application.Books.Queries
{
     public class SmartSearchBooksQuery : PaginatedQueryBase<BookDto>
     {
          public string SearchTerm { get; set; }
     }
}
