using AutoMapper;
using NetReact.Domain.DTOs;
using NetReact.Domain.Interfaces;
using NetReact.Domain.Models;
using NetReact.Domain.Queries;
using NetReact.Domain.ReadModel;
using NetReact.Domain.Wrappers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NetReact.Application.Books.Queries
{
     public class SmartSearchBooksQueryHandler : IRequestHandler<SmartSearchBooksQuery, PagedResponse<BookDto>>
     {
          private readonly IReadModelBookRepository _bookReadRepository;
          private readonly IBookRepository _bookRepository;
          private readonly IMapper _mapper;

          public SmartSearchBooksQueryHandler(IReadModelBookRepository elasticBookRepository, IBookRepository bookRepository, IMapper mapper)
          {
               _bookReadRepository = elasticBookRepository;
               _bookRepository = bookRepository;
               _mapper = mapper;
          }

          public async Task<PagedResponse<BookDto>> Handle(SmartSearchBooksQuery request, CancellationToken cancellationToken)
          {
               var bookIds = await _bookReadRepository.Get(request.SearchTerm, 1, 10);

               var books = _bookRepository.GetBooksWithIds(bookIds);
               var bookDtos = _mapper.Map<List<BookDto>>(books);

               var response = new PagedResponse<BookDto>(bookDtos, request.PageNumber, request.PageSize);

               return response;
          }
     }
}
