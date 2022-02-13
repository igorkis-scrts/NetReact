using NetReact.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;

namespace NetReact.IdentityServer;

public static class IdentityDataSeeder
{
	public static void SeedAll(IdentityContext context, UserManager<ApplicationIdentityUser> userManager)
	{
		//TODO: replace it with migration appliance
		//as EnsureCreated is for rapid prototyping and is not compatible with migrations
		//https://stackoverflow.com/questions/38238043/how-and-where-to-call-database-ensurecreated-and-database-migrate
		context.Database.EnsureCreated();
		SeedUsers(userManager);
	}

	private static void SeedUsers(UserManager<ApplicationIdentityUser> userManager)
	{
		if (userManager.FindByEmailAsync("dimatrubca@gmail.com").Result == null)
		{
			var user = new ApplicationIdentityUser
			{
				UserName = "dimatrubca",
				Email = "dimatrubca@gmail.com",
				IsAdmin = true,
				Id = "1"
			};

			var result = userManager.CreateAsync(user, "mysecreT1!").GetAwaiter().GetResult();

			if (result.Succeeded) userManager.AddToRoleAsync(user, "admin").Wait();
		}

		if (userManager.FindByEmailAsync("igorkisf636cf51cef00bf14a4820f57b645c2d@gmail.com").Result == null)
		{
			var user = new ApplicationIdentityUser
			{
				UserName = "igorkis",
				Email = "igorkisf636cf51cef00bf14a4820f57b645c2d@gmail.com",
				IsAdmin = true,
				Id = "2"
			};

			var result = userManager.CreateAsync(user, "mysecreT1!").GetAwaiter().GetResult();

			if (result.Succeeded) userManager.AddToRoleAsync(user, "admin").Wait();
		}

		if (userManager.FindByEmailAsync("dimatrubca@outlook.com").Result == null)
		{
			var user = new ApplicationIdentityUser
			{
				UserName = "valentin341",
				Email = "dimatrubca@outlook.com"
			};

			userManager.CreateAsync(user, "mysecreT1!").GetAwaiter().GetResult();
		}

		if (userManager.FindByEmailAsync("igor431thelast@gmail.com").Result == null)
		{
			var user = new ApplicationIdentityUser
			{
				UserName = "igor431",
				Email = "igor431@outlook.com"
			};

			userManager.CreateAsync(user, "mysecreT1!").GetAwaiter().GetResult();
		}
	}
}