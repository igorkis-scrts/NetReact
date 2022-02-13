using System;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace NetReact.IdentityServer;

public class IdentityDbContextFactory : IDesignTimeDbContextFactory<IdentityContext>
{
	private readonly IWebHostEnvironment _environment;
	
	public IdentityDbContextFactory(IWebHostEnvironment environment)
	{
		_environment = environment;
	}
	
	public IdentityContext CreateDbContext(string[] args)
	{
		var optionsBuilder = new DbContextOptionsBuilder<IdentityContext>();
		var assemblyName = Assembly.GetExecutingAssembly().GetName().Name;
		var envName = _environment.EnvironmentName;

		var configuration = new ConfigurationBuilder()
			.SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
			.AddJsonFile($"{assemblyName}.appsettings.json", optional: false, reloadOnChange: true)
			.AddJsonFile($"{assemblyName}.appsettings.{envName}.json", optional: true, reloadOnChange: true)
			.Build();

		optionsBuilder
			.UseSqlServer(configuration.GetConnectionString("NetReactIdentity"));

		return new IdentityContext(optionsBuilder.Options);
	}
}