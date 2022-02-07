using NetReact.Domain.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NetReact.Application.Posts.Commands
{
     public class UpdatePostCommand : IRequest<Post>
     {
          [Required]
          public int Id { get; set; }
          public Condition? Condition { get; set; }
          public PostStatus? Status { get; set; }
     }
}
