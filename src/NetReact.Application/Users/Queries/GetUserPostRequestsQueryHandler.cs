//using AutoMapper;
//using NetReact.Application.Common;
//using NetReact.Application.Common.Exceptions;
//using NetReact.Domain.DTOs;
//using NetReact.Domain.Filter;
//using NetReact.Domain.Interfaces;
//using NetReact.Domain.Models;
//using NetReact.Domain.Wrappers;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading;
//using System.Threading.Tasks;

//namespace NetReact.Application.Users.Queries
//{
//     public class GetUserPostRequestsQueryHandler : PaginatedRequestHandler<GetUserPostRequestsQuery, PostDto>
//     {
//          private readonly IRequestRepository _requestRepository;
//          private readonly IUserRepository _userRepository;
//          private readonly IMapper _mapper;

//          public GetUserPostRequestsQueryHandler(IRequestRepository requestRepository, IUserRepository userRepository, IMapper mapper)
//          {
//               _requestRepository = requestRepository;
//               _userRepository = userRepository;
//               _mapper = mapper;
//          }

//          public override Task<PagedResponse<PostDto>> Handle(GetUserPostRequestsQuery request, CancellationToken cancellationToken)
//          {
//               if (_userRepository.GetById(request.UserId) == null)
//               {
//                    throw new NotFoundException(nameof(User), request.UserId);
//               }

//               PaginationFilter filter = new PaginationFilter {
//                    PageNumber = 1,
//                    PageSize = 10
//               };

//               var result = _requestRepository.GetPostRequests(request.UserId, filter, _mapper);


//               return Task.FromResult(result);
//          }
//     }
//}
