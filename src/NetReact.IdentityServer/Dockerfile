ARG VERSION=6.0-alpine3.14

FROM mcr.microsoft.com/dotnet/runtime-deps:$VERSION AS base
WORKDIR /app
EXPOSE 6002

FROM mcr.microsoft.com/dotnet/sdk:$VERSION AS build
WORKDIR /src
COPY ["NetReact.IdentityServer/NetReact.IdentityServer.csproj", "NetReact.IdentityServer/"]
RUN dotnet restore "NetReact.IdentityServer/NetReact.IdentityServer.csproj"
COPY . .
WORKDIR "/src/NetReact.IdentityServer"
RUN dotnet build "NetReact.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NetReact.IdentityServer.csproj" \
    --runtime alpine-x64 \
    --self-contained true \
    /p:PublishSingleFile=true \
    -c Release \
    -o /app/publish 
 
#    /p:PublishTrimmed=true \ is broken under certain circumstances on alpine builds,
#    see https://github.com/dotnet/efcore/issues/26878

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# there is no icu in alpine images, it is required to get full culture support
RUN apk add --no-cache icu

ENTRYPOINT ["./NetReact.IdentityServer", "NetReact.IdentityServer.dll"]
