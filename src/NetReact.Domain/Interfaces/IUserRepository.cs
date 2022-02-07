using AutoMapper;
using NetReact.Domain.DTOs;
using NetReact.Domain.Filter;
using NetReact.Domain.Models;
using NetReact.Domain.Wrappers;
using System;
using System.Collections.Generic;
using System.Text;

namespace NetReact.Domain.Interfaces
{
     public interface IUserRepository : IRepositoryBase<User>
     {
          public User GetUserByIdentityId(string id);
          public PagedResponse<BookDto> GetWishedBooks(int id, PaginationFilter filter, IMapper mapper);
          public UserStatsDto GetUserStats(int id);
          public List<User> GetTopUsers(int topN);
     }
}
