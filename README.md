
<div align="center">
  <img alt="Serverify A3" width="256" heigth="48" src="https://user-images.githubusercontent.com/6746043/153037177-75e57a6b-3872-4c04-aaf8-e11d804d277c.svg">
  <h3>An ASP.NET WebAPI/React Single Page application template</h3>
</div>

### Build status
![example branch parameter](https://github.com/igorkis-scrts/NetReact/actions/workflows/build.yml/badge.svg?branch=master)

## Key Features 
* Single Page Application
* Integration with ElasticSearch for smart search of books (via keywords inside the title/description/author)
* Authentication as a service (IdentityServer, JWT)
* Swagger API documentation

## Functionality
- Add/edit/delete books
- Book search
- Sign in/Sign up

## Instructions
### Infrastructure
- Restore nuget packages (`dotnet-restore`)
- Apply migrations in NetReact.Infrastructure and NetReact.IdentityServer projects (execute `dotnet ef database update` in both projects directories, **MS SQL Server Express required**)
- If you want to use Elastic Search functionality, you need to download and run local instance of ES ([Elastic.co](https://www.elastic.co/downloads/elasticsearch))
- Build solution, run `NetReact.API` and `NetReact.IdentityServer` projects
### Client App
- Install packages (`npm i`)
- run `npm run start` to start dev server (client app will be available via `http://localhost:3000`)

## Components
- [src/NetReact.API](#netreact-api) - ASP.NET Core Web API (CQRS pattern)
- [src/NetReact.Application](#netreact-application)
- [src/NetReact.Domain](#netreact-domain)
- [src/NetReact.Infrastructure](#netreact-infrastructure) - Entity Framework Core, ElasticSearch
- [src/NetReact.IdentityServer](#netreact-identityserver) - authentication as a service (IdentityServer 6)
- [src/NetReact.React](#netreact-react) - Client (React with Typescript)

## NetReact API
The design of the Web API follows CQRS pattern, that allows intercating with the main database (SQL Server) and ElasticSearch, for smart search of books.

## NetReact Application
Application layer of the web application, containing queries and commands for each entity, as well as the book recommendation service, based on the content-filtering algorithm.

## NetReact Domain
Contain domain models, their configurations and repositories

## NetReact Infrastructure
Contains the implementation of repositories for interacting with databases and dbContext.

SQL Server acts as a main database, which contains all of the data. ElasticSearch db contains only the information of books and allows to perform smart queries.

## NetReact IdentityServer
Authentication is implemented as a server, following resource owner credentials workflow and using IdentityServer.

## NetReact React
Client side of the application. React with Typescript.

## Tech Stack
### Infrastructure
- [ASP.NET 6](https://get.asp.net/)
- [Entity Framework](https://docs.microsoft.com/en-US/ef/)
- [Identity Server](https://duendesoftware.com/products/identityserver)
- [Elastic Search](https://www.elastic.co/)
- [Swagger](https://swagger.io/)
### Client App
- [MUI v5](https://mui.com/)
- [React](https://en.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)

## Credits
[Book Exchange App](https://github.com/dimatrubca/book-exchange-app) (dimatrubca)

## Screenshots
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/6746043/153040349-b379547d-91bf-4ec2-a2cf-0fc36cfce936.png" width="950">
