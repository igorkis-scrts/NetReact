using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Application.Posts.Queries
{
     public class GetPostConditionsQuery : IRequest<List<string>>
     {
     }
}
