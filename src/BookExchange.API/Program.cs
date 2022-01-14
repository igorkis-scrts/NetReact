using BookExchange.API.Configuration;
using BookExchange.Application.Common;
using BookExchange.Application.Common.Exceptions;
using BookExchange.Application.Common.Interfaces;
using BookExchange.Application.Common.Services;
using BookExchange.Domain.Interfaces;
using BookExchange.Domain.Models;
using BookExchange.Domain.ReadModel;
using BookExchange.Infrastructure.ElasticSearch;
using BookExchange.Infrastructure.ElasticSearch.Repositories;
using BookExchange.Infrastructure.Persistence;
using BookExchange.Infrastructure.Persistence.Repositories;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder();

builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Logging.AddEventSourceLogger();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
	options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});

builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { Title = "BookExchange", Version = "v1" });

	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		In = ParameterLocation.Header,
		Description = "Please insert JWT with Bearer into field",
		Name = "Authorization",
		Type = SecuritySchemeType.ApiKey
	});
	c.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			new string[] { }
		}
	});
});

builder.Services.AddMvc(
	config => { config.Filters.Add(typeof(ApiExceptionFilter)); }
);

var connectionString = builder.Configuration.GetConnectionString("BookExchange");
builder.Services.AddDbContext<BookExchangeDbContext>(options =>
	options.UseSqlServer(connectionString,
		x => x.MigrationsAssembly(typeof(BookExchangeDbContext).Assembly.FullName)));

//var authOptions = services.ConfigureAuthOptions(Configuration);

// accepts any access token issued by identity server
builder.Services.AddAuthentication("Bearer")
	.AddJwtBearer("Bearer", options =>
	{
		options.Authority = "https://localhost:5001";

		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateAudience = false
		};
	});

// adds an authorization policy to make sure the token is for scope 'api1'
builder.Services.AddAuthorization(options =>
{
	options.AddPolicy("ApiScope", policy =>
	{
		policy.RequireAuthenticatedUser();
		policy.RequireClaim("scope", "bookApi");
	});
});

//services.AddJwtAuthentication(authOptions);

builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers(options => { options.Filters.Add(new AuthorizeFilter()); });

builder.Services.AddSingleton<ILogger>(svc => svc.GetRequiredService<ILogger<RequestTimeMiddleware>>());

builder.Services.AddElasticSearch(builder.Configuration);

builder.Services.AddScoped<DbContext, BookExchangeDbContext>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IBookReviewRepository, BookReviewRepository>();
builder.Services.AddScoped<IRequestRepository, RequestRepository>();
builder.Services.AddScoped<IDealRepository, DealRepository>();
builder.Services.AddScoped<IWishlistRepository, WishlistRepository>();

builder.Services.AddScoped<IRepositoryBase<Author>, RepositoryBase<Author>>();
builder.Services.AddScoped<IRepositoryBase<BookDetails>, RepositoryBase<BookDetails>>();
builder.Services.AddScoped<IRepositoryBase<Wishlist>, RepositoryBase<Wishlist>>();

builder.Services.AddScoped<IReadModelBookRepository, ElasticBookRepository>();
builder.Services.AddScoped<IRecommendationService, RecommendationService>();

builder.Services.AddMediatR(typeof(BookExchange.Application.Class1));
builder.Services.AddAutoMapper(typeof(BookExchange.Application.Common.Mappings.MappingProfile).Assembly);

builder.Services.AddDirectoryBrowser();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
	app.UseSwagger();
	app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BookExchange v1"));
}

app.UseHttpsRedirection();
app.UseStaticFiles();
/*
app.UseFileServer(new FileServerOptions { 
     FileProvider = new PhysicalFileProvider(
          Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles")),
     RequestPath = "/StaticFile"
});*/

app.UseRouting();
app.UseCors(configurePolicy => configurePolicy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => {
	endpoints.MapControllers();
});

using (var scope = app.Services.CreateScope())
{
	var mediator = scope.ServiceProvider.GetService<IMediator>();
	var context = scope.ServiceProvider.GetService<BookExchangeDbContext>();
	DataInitializer.SeedDatabase(context, mediator);
}

app.Run();