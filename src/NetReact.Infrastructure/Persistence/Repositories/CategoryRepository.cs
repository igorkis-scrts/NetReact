using NetReact.Domain.Interfaces;
using NetReact.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Infrastructure.Persistence.Repositories
{
     public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
     {
          public CategoryRepository(NetReactDbContext context) : base(context)
          {
          }
     }
}
