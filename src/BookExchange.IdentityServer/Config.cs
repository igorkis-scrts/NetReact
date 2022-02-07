using System.Collections.Generic;
using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using IdentityModel;

namespace BookExchange.IdentityServer
{
	public static class Config
	{
		public static IEnumerable<IdentityResource> IdentityResources =>
			new List<IdentityResource>
			{
				new IdentityResources.OpenId(),
				new IdentityResources.Profile(),
				new IdentityResources.Email(),
				new IdentityResources.Phone(),
				new IdentityResources.Address(),
				new("roles", "User Roles", new List<string> { "role" })
			};


		public static IEnumerable<ApiScope> ApiScopes =>
			new List<ApiScope>
			{
				new("bookApi", "BookExchange Web API")
			};

		public static List<ApiResource> ApiResources =>
			new()
			{
				new ApiResource("bookApiResource", "BookExchange Web API Resoure")
				{
					Scopes = { "bookApi" },
					UserClaims =
					{
						JwtClaimTypes.Role,
						JwtClaimTypes.Name,
						JwtClaimTypes.Id
					}
				}
			};


		public static IEnumerable<Client> Clients =>
			new List<Client>
			{
				new()
				{
					ClientId = "client",
					ClientName = "React Client",
					RequireClientSecret = false,
					AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
					AllowedScopes =
					{
						IdentityServerConstants.StandardScopes.OpenId,
						IdentityServerConstants.StandardScopes.Profile,
						"roles",
						"bookApi"
					}
				}
			};
	}
}