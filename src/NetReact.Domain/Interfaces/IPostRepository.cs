using NetReact.Domain.DTOs;
using NetReact.Domain.Filter;
using NetReact.Domain.Models;
using NetReact.Domain.Wrappers;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetReact.Domain.Interfaces
{
     public interface IPostRepository : IRepositoryBase<Post>
     {
          public PagedResponse<PostDto> GetUsersActivePosts(int userId, PaginationFilter filter);
     }
}
