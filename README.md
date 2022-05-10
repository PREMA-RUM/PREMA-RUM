# [PREMA-RUM](https://www.premarum.com/)

## Team Members: [Kenneth J. Rosario Acevedo](https://github.com/kenneth-rosario), [José A. Rivera Morales](https://github.com/https://github.com/joseriveramorales), [Yavier A. Mari Rodríguez](https://github.com/YMari)

### PREMA-RUM is a web application for creating enrollment logistical plans, storing and sharing them with the community.

### This project was originally built for the CIIC4151/INSO4151 (Senior Development Project - Capstone) course at UPRM, Spring 2022.

## Development Guide
### Prerequisites:
- Download and install [Docker](https://docs.docker.com/get-docker/).
- Download and install [Docker Compose](https://docs.docker.com/compose/install/).
- Download and install [.NET SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0).
- Download and install [Node.js](https://joachim8675309.medium.com/installing-node-js-with-nvm-4dc469c977d9).

### Frontend Changes:
Frontend source files can be found in the premarum-web-client directory.

Install all dependancies:
```
npm install
```

Run dev server
```
npm run dev
```

Build production output
```
npm build
```

### Backend Changes:

Backend source files can be found in the premarum-backend directory. Recommended IDES are: [Visual Studio](https://visualstudio.microsoft.com/downloads/), [Visual Studio Code](https://code.visualstudio.com/download) and [JetBrains Rider](https://www.jetbrains.com/rider/download/#section=windows).

Install all dependancies:
```
dotnet restore
```

Run project:
```
dotnet run --project PreEnrollmentMgmt.WebApi
```

### Database Changes:
To init a local dev database using docker:
```
docker-compose up db
```

The database will be mapped to your machine's port 9001.

## Deployment

### CI/CD has been configured making new changes to main automatically be pushed to the backend and frontend servers. 

### Current Hosting Services: (as of May 10, 2022)
- [AWS](https://aws.amazon.com/) for Backend and Database.
- [Vercel](https://vercel.com/) for Frontend server.
