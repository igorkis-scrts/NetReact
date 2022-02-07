using BookExchange.Application.Common;
using BookExchange.Application.Common.Exceptions;
using BookExchange.Domain.Interfaces;
using BookExchange.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BookExchange.Application.Categories.Commands
{
     public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Category>
     {
          private readonly ICategoryRepository _categoriesRepository;

          public CreateCategoryCommandHandler(ICategoryRepository categoriesRepository)
          {
               _categoriesRepository = categoriesRepository;
          }

          public Task<Category> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
          {
               if (ServiceUtils.CheckBookCategoryExists(_categoriesRepository, request.Name)) {
                    throw new BadRequestException($"Category with name = {request.Name} already exists");
               }

               Category bookCategory = new Category
               {
                    Name = request.Name
               };

               _categoriesRepository.Add(bookCategory);
               _categoriesRepository.SaveAll();

               return Task.FromResult(bookCategory);
          }
     }
}
