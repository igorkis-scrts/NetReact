namespace NetReact.Domain.Filter
{
     public class PaginationFilter
     {
          private int _pageNumber;
          private int _pageSize;

          public int PageNumber { 
               get => _pageNumber;

               set  
               {
                    if (value < 1) _pageNumber = 1;
                    else if (value > 10) _pageNumber = 10;
                    else _pageNumber = value;
               } 
          }

          public int PageSize
          {
               get => _pageSize;

               set
               {
                    if (value < 1) _pageSize = 1;
                    else if (value > 10) _pageSize = 10;
                    else _pageSize = value;

               }
          }

          public string SortDirection { get; set; }
          public virtual string SortBy { get; set; }

          public PaginationFilter()
          {
               PageNumber = 1;
               PageSize = 10;
          }
          public PaginationFilter(int pageNumber, int pageSize)
          {
               PageNumber = pageNumber < 1 ? 1 : pageNumber;
               PageSize = pageSize > 10 ? 10 : pageSize;
          }
          public LogicalOperator FilterLogicalOperator { get; set; }
     }
}
