using System.Collections.Generic;

namespace BookExchange.Domain.Wrappers;

public class PagedResponse<T> : Response<List<T>>
{
	public int PageNumber { get; set; }
	public int PageSize { get; set; }
	public int TotalRecords { get; set; }
	
	public int TotalPages { get; set; }

	public PagedResponse(List<T> data, int pageNumber, int pageSize) : base(data)
	{
		PageNumber = pageNumber;
		PageSize = pageSize;
		Data = data;
	}
}