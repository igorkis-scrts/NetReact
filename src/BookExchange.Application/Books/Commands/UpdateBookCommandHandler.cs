using BookExchange.Domain.Interfaces;
using BookExchange.Domain.Models;
using BookExchange.Application.Common.Exceptions;
using MediatR;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using BookExchange.Application.Common;
using Microsoft.AspNetCore.Hosting;

namespace BookExchange.Application.Books.Commands
{
	class UpdateBookCommandHandler : IRequestHandler<UpdateBookCommand, Book>
	{
		private readonly IBookRepository _bookRepository;
		private readonly IWebHostEnvironment _environment;
		private readonly IRepositoryBase<Author> _bookAuthorsRepository;
		private readonly ICategoryRepository _bookCategoriesRepository;

		public UpdateBookCommandHandler(IBookRepository bookRepository, IRepositoryBase<Author> bookAuthorsRepository,
			ICategoryRepository bookCategoriesRepository, IWebHostEnvironment environment)
		{
			_bookRepository = bookRepository;
			_bookAuthorsRepository = bookAuthorsRepository;
			_bookCategoriesRepository = bookCategoriesRepository;
			_environment = environment;
		}

		public async Task<Book> Handle(UpdateBookCommand command, CancellationToken cancellationToken)
		{
			var book = _bookRepository.GetByIdWithInclude(command.Id, b => b.Details, b => b.Authors,
				b => b.Categories);

			if (book == null)
			{
				throw new NotFoundException(nameof(Book), command.Id);
			}

			if (!string.IsNullOrWhiteSpace(command.Title))
			{
				book.Title = command.Title;
			}

			if (!string.IsNullOrWhiteSpace(command.ShortDescription))
			{
				book.ShortDescription = command.ShortDescription;
			}

			if (!string.IsNullOrWhiteSpace(command.Isbn))
			{
				book.Isbn = command.Isbn;
			}

			if (!string.IsNullOrWhiteSpace(command.Description))
			{
				book.Details.Description = command.Description;
			}

			if (!string.IsNullOrWhiteSpace(command.Publisher))
			{
				book.Details.Publisher = command.Publisher;
			}

			if (command.Image != null)
			{
				var uploadDirectory = Path.Combine("uploads", "books");
				var imagePath = await ServiceUtils.SaveFile(_environment, command.Image, uploadDirectory);
				book.ThumbnailPath = imagePath;
			}


			if (command.AuthorIds != null)
				command.AuthorIds.ForEach(id =>
				{
					var author = _bookAuthorsRepository.GetById(id);

					if (author != null)
					{
						book.Authors.Add(author);
					}
				});

			if (command.CategoryIds != null)
				command.CategoryIds.ForEach(id =>
				{
					var category = _bookCategoriesRepository.GetById(id);

					if (category != null)
					{
						book.Categories.Add(category);
					}
				});

			_bookRepository.SaveAll();

			return await Task.FromResult(book);
		}
	}
}