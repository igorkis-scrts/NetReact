using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetReact.Domain.Models
{
     public class Author : BaseEntity
     {
          public string Name { get; set; }
          public virtual ICollection<Book> Books { get; set; }
     }
}
