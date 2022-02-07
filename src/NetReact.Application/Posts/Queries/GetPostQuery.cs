using NetReact.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetReact.Application.Posts.Queries
{
     public class GetPostQuery : IRequest<Post>
     {
          public int Id { get; set; }
     }
}
