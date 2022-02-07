using NetReact.Domain.Models;
using NetReact.Domain.Wrappers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NetReact.Domain.ReadModel
{
     public interface IReadModelBookRepository
     {
          public Task AddAsync(ReadModelBook book);
          public Task DeleteById(int id);
          public Task AddBulkAsync(ReadModelBook[] books);
          public Task<List<int>> Get(string query, int page, int pageSize);
     }
}
