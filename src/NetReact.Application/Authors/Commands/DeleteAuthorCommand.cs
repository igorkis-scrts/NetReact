using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Application.Authors.Commands
{
     public class DeleteAuthorCommand : IRequest<Unit> 
     {
          public int Id { get; set; }
     }
}
