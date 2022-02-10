FROM mcr.microsoft.com/dotnet/sdk:6.0 AS base

RUN dotnet tool install --global dotnet-ef
ENV PATH="${PATH}:/root/.dotnet/tools"

WORKDIR /build

# Copy solution file
COPY NetReact.sln ./

COPY ["NetReact.IdentityServer/NetReact.IdentityServer.csproj", "NetReact.IdentityServer/"]

COPY . .

WORKDIR NetReact.IdentityServer
CMD ["dotnet", "ef", "database", "update", "--connection", "Data Source = sql-server-db,1433; Initial Catalog = NetReactIdentity; MultipleActiveResultSets=true; User ID=sa; Password=StrongP@ssw0rd"]