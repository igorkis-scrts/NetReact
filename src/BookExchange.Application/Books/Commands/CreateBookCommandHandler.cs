using BookExchange.Application.Books.Events;
using BookExchange.Application.Common.Exceptions;
using BookExchange.Application.Common;
using BookExchange.Domain.Interfaces;
using BookExchange.Domain.Models;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace BookExchange.Application.Books.Commands
{
	class CreateBookCommandHandler : IRequestHandler<CreateBookCommand, Book>
	{
		private readonly IMediator _mediator;
		private readonly IWebHostEnvironment _environment;
		private readonly IBookRepository _bookRepository;
		private readonly IRepositoryBase<Author> _bookAuthorsRepository;
		private readonly ICategoryRepository _bookCategoriesRepository;

		public CreateBookCommandHandler(IBookRepository bookRepository,
			IRepositoryBase<Author> bookAuthorsRepository, ICategoryRepository bookCategoriesRepository,
			IWebHostEnvironment environment, IMediator mediator)
		{
			_bookRepository = bookRepository;
			_bookAuthorsRepository = bookAuthorsRepository;
			_bookCategoriesRepository = bookCategoriesRepository;
			_environment = environment;
			_mediator = mediator;
		}


		public async Task<Book> Handle(CreateBookCommand request, CancellationToken cancellationToken)
		{
			if (ServiceUtils.CheckBookWithIsbnExists(_bookRepository, request.Isbn))
			{
				throw new BadRequestException($"Book with ISBN = {request.Isbn} already exists");
			}

			var uploadDirectory = Path.Combine("uploads", "books");
			var imagePath = await ServiceUtils.SaveFile(_environment, request.Image, uploadDirectory);

			var book = new Book
			{
				Title = request.Title,
				Isbn = request.Isbn,
				ShortDescription = request.ShortDescription,
				ThumbnailPath = imagePath,
				Authors = request.AuthorIds?.Select(id => _bookAuthorsRepository.GetById(id)).ToList(),
				Categories = request.CategoryIds?.Select(id => _bookCategoriesRepository.GetById(id)).ToList(),
				Details = new BookDetails
				{
					Description = request.Description,
					Publisher = request.Publisher,
					PublishedYear = request.PublishedYear,
					PageCount = request.PageCount,
					ImagePath = imagePath
				}
			};

			_bookRepository.Add(book);
			_bookRepository.SaveAll();

			await _mediator.Publish(new BookCreatedEvent
			{
				Id = book.Id,
				Title = book.Title,
				ShortDescription = book.ShortDescription,
				Description = book.Details.Description,
				Authors = book.Authors?.Select(a => a.Name).ToList(),
				Categories = book.Categories?.Select(a => a.Name).ToList()
			}, cancellationToken);

			return await Task.FromResult(book);
		}
	}
}