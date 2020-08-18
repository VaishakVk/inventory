# Inventory

This is a simple Web application that allows basic CRUD operations.

## Tech Stack

-   Backend - Node.JS
-   Frontend - Angular 9
-   Database - MySQL

## Steps to install

-   Clone the directory `https://github.com/VaishakVk/inventory.git`
-   Navigate to base directory where files are uploaded.

### Server

-   Navigate to `server` folder.
-   Open a terminal and run

```
npm install
```

-   Once installation is complete, create `.env` file inside the `server` folder and add the configuration details as required. Refer to `.env.example` for all the keys required.

-   Run the following

```
npm run migrate
```

This will create `inventory` database and migrate all the required tables.

-   Run `npm start`. This will listen to incoming request

### Client

-   Navigate to `client` folder.
-   Open a terminal and run

```
npm install
```

-   After installation, navigate to `environment.ts` file and change the API URL based on the port backend is running. By default port is set to `5000`
-   Run `npm start`. Once the compilation is complete, open browser at `localhost:4200`
