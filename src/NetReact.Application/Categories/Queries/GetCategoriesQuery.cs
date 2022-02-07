using NetReact.Domain.DTOs;
using NetReact.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Application.Categories.Queries
{
     public class GetCategoriesQuery : IRequest<List<Category>>
     {
     }
}
