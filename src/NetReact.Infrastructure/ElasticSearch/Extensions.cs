using NetReact.Domain.ReadModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nest;
using System;

namespace NetReact.Infrastructure.ElasticSearch
{
     public static class Extensions
     {
          public static void AddElasticSearch(this IServiceCollection services, IConfiguration configuration)
          {
               var url = configuration["elasticsearch:url"];
               var defaultIndex = configuration["elasticsearch:index"];



               var settings = new ConnectionSettings(new Uri(url))
                    .DefaultIndex(defaultIndex);

               AddDefaultMappings(settings);

               var client = new ElasticClient(settings);

               services.AddSingleton<IElasticClient>(client);

               CreateIndex(client, defaultIndex);
          }

          private static void AddDefaultMappings(ConnectionSettings settings)
          {
               settings.DefaultMappingFor<ReadModelBook>(m => m);
          }

          private static void CreateIndex(IElasticClient client, string indexName)
          {
               client.Indices.Create(indexName, index => index.Map<ReadModelBook>(x => x.AutoMap()));
          }
     }
}
