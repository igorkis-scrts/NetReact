using NetReact.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace NetReact.Domain.Interfaces
{
     public interface IBookRepository : IRepositoryBase<Book>
     {
          public List<Book> GetBooksByCondition(Expression<Func<Book, bool>> predicate);
          public List<Book> GetBooksWithIds(List<int> idList);
     }
}