using System.Collections.Generic;

namespace NetReact.Domain.Wrappers;

public class PagedResponse<T> : Response<IEnumerable<T>>
{
	public int PageNumber { get; set; }
	public int PageSize { get; set; }
	public int TotalRecords { get; set; }

	public PagedResponse(IEnumerable<T> data, int pageNumber, int pageSize) : base(data)
	{
		PageNumber = pageNumber;
		PageSize = pageSize;
		Data = data;
	}
}