using NetReact.Domain.DTOs;
using NetReact.Domain.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetReact.Application.Common;

namespace NetReact.Application.Users.Queries
{
     public class GetUserWishedBooksQuery : PaginatedQueryBase<BookDto>
     {
          public int UserId { get; set; }
     }
}
