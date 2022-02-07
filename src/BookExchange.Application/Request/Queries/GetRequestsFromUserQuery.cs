using BookExchange.Domain.DTOs;
using BookExchange.Domain.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BookExchange.Application.Common;

namespace BookExchange.Application.Request.Queries
{
     public class GetRequestsFromUserQuery : PaginatedQueryBase<RequestDto>
     {
          public int UserId { get; set; }
     }
}
