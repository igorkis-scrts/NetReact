ARG VERSION=6.0-alpine3.14

FROM mcr.microsoft.com/dotnet/aspnet:$VERSION AS base
WORKDIR /app
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:$VERSION AS build
WORKDIR /src
COPY ["NetReact.API/NetReact.API.csproj", "NetReact.API/"]
COPY ["NetReact.Application/NetReact.Application.csproj", "NetReact.Application/"]
COPY ["NetReact.Domain/NetReact.Domain.csproj", "NetReact.Domain/"]
COPY ["NetReact.Infrastructure/NetReact.Infrastructure.csproj", "NetReact.Infrastructure/"]
RUN dotnet restore "NetReact.API/NetReact.API.csproj"
COPY . .
WORKDIR "/src/NetReact.API"
RUN dotnet build "NetReact.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NetReact.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# there are no bash, openssl and icu packages in alpine images
RUN apk add --no-cache bash openssl icu

COPY entrypoint.sh ./
RUN ["chmod", "+x", "entrypoint.sh"]
ENTRYPOINT ["./entrypoint.sh"]