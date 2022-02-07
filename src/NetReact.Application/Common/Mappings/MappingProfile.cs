using AutoMapper;
using NetReact.Application.Books.Commands;
using NetReact.Domain.Filter;
using NetReact.Application.Posts.Commands;
using NetReact.Domain.DTOs;
using NetReact.Domain.Models;
using NetReact.Domain.Queries;
using NetReact.Application.Posts.Queries;
using NetReact.Application.Authors.Commands;
using NetReact.Application.Books.Events;
using NetReact.Application.Users.Queries;
using NetReact.Domain.ReadModel;

namespace NetReact.Application.Common.Mappings
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Book, BookDto>();
			CreateMap<CreateBookCommand, Book>();
			CreateMap<BookDetails, BookDetailsDto>();

			CreateMap<Post, PostDto>();
			CreateMap<PostDto, Post>();
			CreateMap<CreatePostCommand, Post>();
			CreateMap<ReplacePostCommand, Post>();

			CreateMap<User, UserDto>();
			CreateMap<UserContact, UserContactDto>();


			CreateMap<BooksFilter, GetBooksQuery>();
			CreateMap<GetBooksQuery, PaginationFilter>();

			CreateMap<BooksFilter, GetUserWishedBooksQuery>();
			CreateMap<GetUserWishedBooksQuery, PaginationFilter>();

			CreateMap<PostsFilter, GetPostsQuery>();
			CreateMap<GetPostsQuery, PaginationFilter>();


			CreateMap<CreateAuthorDto, CreateAuthorCommand>();
			CreateMap<Author, AuthorDto>();

			CreateMap<Category, CategoryDto>();

			CreateMap<BookCreatedEvent, ReadModelBook>();

			CreateMap<Wishlist, WishListDto>();

			CreateMap<GetUserPostsQuery, PaginationFilter>();
			CreateMap<PaginationFilter, GetUserPostsQuery>();
		}
	}
}