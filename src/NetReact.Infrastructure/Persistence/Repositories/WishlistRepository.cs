using NetReact.Domain.Interfaces;
using NetReact.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Infrastructure.Persistence.Repositories
{
     public class WishlistRepository : RepositoryBase<Wishlist>, IWishlistRepository
     {
          public WishlistRepository(NetReactDbContext context) : base(context)
          {
          }
     }
}
