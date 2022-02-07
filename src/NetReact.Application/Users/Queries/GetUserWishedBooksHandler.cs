using AutoMapper;
using NetReact.Application.Common;
using NetReact.Domain.DTOs;
using NetReact.Domain.Filter;
using NetReact.Domain.Interfaces;
using NetReact.Domain.Wrappers;
using IdentityModel;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NetReact.Application.Users.Queries
{
     public class GetUserWishedBooksHandler : PaginatedRequestHandler<GetUserWishedBooksQuery, BookDto>
     {
          private readonly IUserRepository _userRepository;
          private readonly IHttpContextAccessor _contextAccessor;
          private readonly IMapper _mapper;

          public GetUserWishedBooksHandler(IUserRepository userRepository, IHttpContextAccessor contextAccessor, IMapper mapper)
          {
               _userRepository = userRepository;
               _contextAccessor = contextAccessor;
               _mapper = mapper;
          }

          public override Task<PagedResponse<BookDto>> Handle(GetUserWishedBooksQuery request, CancellationToken cancellationToken)
          {
               string identityId = _contextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier).Value;

               var user = _userRepository.GetUserByIdentityId(identityId);

               var filter = _mapper.Map<PaginationFilter>(request);

               var wishedBooks = _userRepository.GetWishedBooks(user.Id, filter, _mapper);

               return Task.FromResult(wishedBooks);
          }
     }
}
