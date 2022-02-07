using AutoMapper;
using BookExchange.Domain.DTOs;
using BookExchange.Domain.Filter;
using BookExchange.Domain.Interfaces;
using BookExchange.Domain.Models;
using BookExchange.Domain.Wrappers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using BookExchange.Infrastructure.Persistence.Extensions;

namespace BookExchange.Infrastructure.Persistence.Repositories
{
     public class UserRepository : RepositoryBase<User>, IUserRepository
     {
          public UserRepository(BookExchangeDbContext context) : base(context)
          {
          }

          public User GetUserByIdentityId(string id)
          {
               return GetAllByConditionWithInclude(u => u.IdentityId == id, u => u.UserContact).Single();
          }

          public PagedResponse<BookDto> GetWishedBooks(int id, PaginationFilter filter, IMapper mapper)
          {
               var user = GetById(id);
               var booksQuery = _context.Entry(user).Collection(b => b.WishedBooks).Query()
                                   .Include(b => b.Authors)
                                   .Include(b => b.Categories);

               return booksQuery.CreatePaginatedResponse<Book, BookDto>(null, null, filter, mapper);
          }
          public UserStatsDto GetUserStats(int id)
          {
               var user = GetById(id);

               return new UserStatsDto
               {
                    Wishlist = _context.Entry(user).Collection(u => u.WishedBooks).Query().Count(),
                    Bookshelf = _context.Entry(user).Collection(u => u.Posts).Query().Count(p => p.Status == PostStatus.Active),
               };
          }

          public List<User> GetTopUsers(int topN)
          {
               var topUsers = _entitites.Take(topN).Take(topN).ToList();

               return topUsers;
          }
     }
}
