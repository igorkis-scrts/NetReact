using NetReact.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetReact.Application.Users.Queries
{
     public class GetUserQuery : IRequest<User>
     {
          public int Id { get; set; }
     }
}
