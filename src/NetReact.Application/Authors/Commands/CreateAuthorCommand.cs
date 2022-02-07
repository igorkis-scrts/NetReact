using NetReact.Domain.DTOs;
using NetReact.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Application.Authors.Commands
{
     public class CreateAuthorCommand : IRequest<Author>
     {
          public string Name { get; set; }
     }
}
