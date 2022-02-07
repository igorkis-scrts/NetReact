using AutoMapper;
using NetReact.Domain.DTOs;
using NetReact.Domain.Filter;
using NetReact.Domain.Interfaces;
using NetReact.Domain.Models;
using NetReact.Domain.Wrappers;
using NetReact.Infrastructure.Persistence.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Infrastructure.Persistence.Repositories
{
     public class PostRepository : RepositoryBase<Post>, IPostRepository
     {
          private readonly IMapper _mapper;
          public PostRepository(NetReactDbContext context, IMapper mapper) : base(context)
          {
               _mapper = mapper;
          }

          public PagedResponse<PostDto> GetUsersActivePosts(int userId, PaginationFilter filter)
          {
               var postsQuery = _entitites.Where(x => x.PostedById == userId)
                                          .Where(x => x.Status == PostStatus.Active)
                                          .Include(x => x.Book).ThenInclude(x => x.Authors)
                                          .Include(x => x.Book).ThenInclude(x => x.Categories)
                                          .Include(x => x.PostedBy);

               var result = postsQuery.CreatePaginatedResponse<Post, PostDto>(null, null, filter, _mapper);

               return result;
          }
     }
}
