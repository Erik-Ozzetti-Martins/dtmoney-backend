# API DT Money

The DT Money API is a financial platform that allows you to manage transactions and ledgers in a simple and secure way. The API provides a set of RESTful endpoints to perform CRUD operations on ledgers. It also includes an authentication system to ensure the security of the user's data. The API is built using Node.js and uses PostgreSQL as the database.

## Rotas

### Autenticação
- **POST** `/auth/signin`:  Allows the user to log in to the API by providing their email and password.
- **POST** `/auth/signup`:Allows the user to create a new account by providing their email and password.

### Ledgers
- **GET** `/ledgers`: Returns a list of all existing ledgers.
- **POST** `/ledgers`:Creates a new ledger by providing its name, type, and initial balance.

## Installation

To install and run the DT Money API, you will need to have Node.js and PostgreSQL installed on your machine. Follow the steps below to set up the API:

1. Clone the repository: git clone git@github.com:erikomis/dtmoney-backend.git
2. Install the dependencies: npm install
3. Create a .env file with your database and configuration settings (see .env.example for reference)
4. Run `prisma generate` to generate Prisma Client
5. Start the API: `npm start`

## Usage
To use the API, you will need to make requests to the endpoints using a tool such as Postman or cURL. Make sure to include the appropriate headers and parameters for each request.

## Security
The DT Money API implements a secure authentication system using JSON Web Tokens (JWT). All routes that require authentication have a middleware that verifies the validity of the token provided in the headers of the request. Additionally, all passwords are hashed before being stored in the database.