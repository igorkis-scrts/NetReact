using NetReact.Domain.DTOs;
using NetReact.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetReact.Domain.Queries
{
     public class GetBookQuery : IRequest<Book> {
          public int Id { get; set; }
          public bool IncludeDetails { get; set; }

     }
}
