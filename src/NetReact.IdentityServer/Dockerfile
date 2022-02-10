FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 6002

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["NetReact.IdentityServer/NetReact.IdentityServer.csproj", "NetReact.IdentityServer/"]
RUN dotnet restore "NetReact.IdentityServer/NetReact.IdentityServer.csproj"
COPY . .
WORKDIR "/src/NetReact.IdentityServer"
RUN dotnet build "NetReact.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NetReact.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NetReact.IdentityServer.dll"]
