using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BookExchange.Domain.Models
{
     public class Category : BaseEntity
     {
          public string Name;

          public List<Book> Books;
     }
}
