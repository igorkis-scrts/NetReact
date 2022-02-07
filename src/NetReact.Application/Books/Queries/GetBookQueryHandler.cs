using System.Threading;
using System.Threading.Tasks;
using NetReact.Application.Common.Exceptions;
using NetReact.Domain.Interfaces;
using NetReact.Domain.Models;
using NetReact.Domain.Queries;
using MediatR;

namespace NetReact.Application.Books.Queries
{
	public class GetBookQueryHandler : IRequestHandler<GetBookQuery, Book>
	{
		private readonly IBookRepository _bookRepository;

		public GetBookQueryHandler(IBookRepository bookRepository)
		{
			_bookRepository = bookRepository;
		}

		public Task<Book> Handle(GetBookQuery request, CancellationToken cancellationToken)
		{
			var book = !request.IncludeDetails
				? _bookRepository.GetById(request.Id)
				: _bookRepository.GetByIdWithInclude(request.Id, b => b.Details, b => b.Categories, b => b.Authors);

			if (book == null)
			{
				throw new NotFoundException(nameof(Book), request.Id);
			}

			return Task.FromResult(book);
		}
	}
}