FROM mcr.microsoft.com/dotnet/sdk:6.0 AS base

RUN dotnet tool install --global dotnet-ef
ENV PATH="${PATH}:/root/.dotnet/tools"

WORKDIR /build

# Copy solution file
COPY NetReact.sln ./

COPY ["NetReact.API/NetReact.API.csproj", "NetReact.API/"]
COPY ["NetReact.Application/NetReact.Application.csproj", "NetReact.Application/"]
COPY ["NetReact.API/NetReact.API.csproj", "NetReact.API/"]
COPY ["NetReact.Application/NetReact.Application.csproj", "NetReact.Application/"]
COPY ["NetReact.Domain/NetReact.Domain.csproj", "NetReact.Domain/"]
COPY ["NetReact.Infrastructure/NetReact.Infrastructure.csproj", "NetReact.Infrastructure/"]

COPY . .

WORKDIR NetReact.Infrastructure
CMD ["dotnet", "ef", "database", "update", "--connection", "Data Source = sql-server-db,1433; Initial Catalog = NetReact; MultipleActiveResultSets=true; User ID=sa; Password=StrongP@ssw0rd"]