using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace NetReact.Infrastructure.HealthCheck;

public class DbPendingMigrationHealthCheck<TContext> : IHealthCheck where TContext : DbContext
{
	private readonly TContext _dbContext;

	public DbPendingMigrationHealthCheck(TContext dbContext)
	{
		_dbContext = dbContext;
	}
	
	public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
	{
		var pendingMigrations = await _dbContext.Database.GetPendingMigrationsAsync(cancellationToken);
		var migrations = pendingMigrations as string[] ?? pendingMigrations.ToArray();
		
		var isHealthy = !migrations.Any();

		return isHealthy
			? HealthCheckResult.Healthy("No pending db migrations")
			: HealthCheckResult.Unhealthy($"{migrations.Length} migrations pending!");
	}
}