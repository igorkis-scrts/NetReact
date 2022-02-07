using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using NetReact.Domain;
using NetReact.Domain.Filter;
using NetReact.Domain.Wrappers;
using Microsoft.EntityFrameworkCore;

namespace NetReact.Infrastructure.Persistence.Extensions;

public static class QueryableExtensions
{
	public static PagedResponse<TDto> CreatePaginatedResponse<TEntity, TDto>(this IQueryable<TEntity> query,
		List<Expression<Func<TEntity, bool>>> predicates, List<Expression<Func<TEntity, object>>> includes,
		PaginationFilter paginationFilter, IMapper mapper) where TEntity : class
	{
		query = query
			.IncludeMultiple(includes?.ToArray())
			.Filter(predicates, paginationFilter.FilterLogicalOperator);

		var total = query.Count();

		if (paginationFilter.SortBy != null)
		{
			query = paginationFilter.SortDirection == "desc"
				? query.OrderByDescending(paginationFilter.SortBy)
				: DynamicQueryableExtensions.OrderBy(query, paginationFilter.SortBy);
		}


		query = query.Page(paginationFilter.PageNumber, paginationFilter.PageSize);


		var listResult = mapper.Map<TDto[]>(query.ToList());

		return new PagedResponse<TDto>(listResult, paginationFilter.PageNumber, paginationFilter.PageSize)
		{
			TotalRecords = total
		};
	}

	public static IQueryable<T> IncludeMultiple<T>(this IQueryable<T> query,
		params Expression<Func<T, object>>[] includes) where T : class
	{
		if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

		return query;
	}

	public static Task EnableIdentityInsert<T>(this DbContext context)
	{
		return SetIdentityInsert<T>(context, true);
	}

	public static Task DisableIdentityInsert<T>(this DbContext context)
	{
		return SetIdentityInsert<T>(context, false);
	}

	private static Task SetIdentityInsert<T>(DbContext context, bool enable)
	{
		var entityType = context.Model.FindEntityType(typeof(T));
		var value = enable ? "ON" : "OFF";
		return context.Database.ExecuteSqlRawAsync(
			$"SET IDENTITY_INSERT {entityType.GetSchema()}.{entityType.GetTableName()} {value}");
	}

	public static void SaveChangesWithIdentityInsert<T>(this DbContext context)
	{
		using var transaction = context.Database.BeginTransaction();
		context.EnableIdentityInsert<T>();
		context.SaveChanges();
		context.DisableIdentityInsert<T>();
		transaction.Commit();
	}

	public static IOrderedQueryable<T> OrderBy<T>(
		this IQueryable<T> source,
		string property)
	{
		return ApplyOrder(source, property, "OrderBy");
	}

	public static IOrderedQueryable<T> OrderByDescending<T>(
		this IQueryable<T> source,
		string property)
	{
		return ApplyOrder(source, property, "OrderByDescending");
	}

	public static IOrderedQueryable<T> ThenBy<T>(
		this IOrderedQueryable<T> source,
		string property)
	{
		return ApplyOrder(source, property, "ThenBy");
	}

	public static IOrderedQueryable<T> ThenByDescending<T>(
		this IOrderedQueryable<T> source,
		string property)
	{
		return ApplyOrder(source, property, "ThenByDescending");
	}

	private static IOrderedQueryable<T> ApplyOrder<T>(
		IQueryable<T> source,
		string property,
		string methodName)
	{
		var props = property.Split('.');
		var type = typeof(T);
		var arg = Expression.Parameter(type, "x");
		Expression expr = arg;
		foreach (var prop in props)
		{
			// use reflection (not ComponentModel) to mirror LINQ
			var pi = type.GetProperty(prop);
			expr = Expression.Property(expr, pi);
			type = pi.PropertyType;
		}

		var delegateType = typeof(Func<,>).MakeGenericType(typeof(T), type);
		var lambda = Expression.Lambda(delegateType, expr, arg);

		var result = typeof(Queryable).GetMethods().Single(
				method => method.Name == methodName
				          && method.IsGenericMethodDefinition
				          && method.GetGenericArguments().Length == 2
				          && method.GetParameters().Length == 2)
			.MakeGenericMethod(typeof(T), type)
			.Invoke(null, new object[] { source, lambda });
		return (IOrderedQueryable<T>)result;
	}

	public static IQueryable<T> Page<T>(this IQueryable<T> query, int page, int pageSize = 10)
	{
		return query.Skip((page - 1) * pageSize).Take(pageSize);
	}

	public static IQueryable<T> Filter<T>(this IQueryable<T> query, List<Expression<Func<T, bool>>> predicates,
		LogicalOperator filterLogicalOperator)
	{
		return query.Where(predicates.CombineExpresions(filterLogicalOperator));
	}
}