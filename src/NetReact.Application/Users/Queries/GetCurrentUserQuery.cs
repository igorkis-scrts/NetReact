using NetReact.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Application.Users.Queries
{
     public class GetCurrentUserQuery : IRequest<User>
     {

     }
}
