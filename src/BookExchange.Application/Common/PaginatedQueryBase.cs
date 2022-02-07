using BookExchange.Domain.Wrappers;
using MediatR;

namespace BookExchange.Application.Common
{
     public class PaginatedQueryBase<TDto> : IRequest<PagedResponse<TDto>>
     {
          public int PageNumber { get; set; }
          public int PageSize { get; set; }
          public string SortDirection { get; set; }
          public string SortBy { get; set; }
          public string FilterLogicalOperator { get; set; }
     }
}
