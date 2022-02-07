using NetReact.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Application.Users.Commands
{
     public class UpdateUserCommand : IRequest<User>
     {
     }
}
