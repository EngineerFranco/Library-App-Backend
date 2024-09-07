# Library App Backend

Welcome to the Library App Backend! This project is a RESTful API built using Node.js, Express, PostgreSQL, JWT, and bcrypt for authentication. It is designed to serve as the backend for the Library App, which is connected to a React frontend. The backend provides a set of ready-to-use REST API endpoints for interacting with the library system.

## Features

- **Authentication**: Secure user authentication using JWT and bcrypt.
- **Database Integration**: PostgreSQL for managing data.
- **REST API**: Ready-to-use endpoints for CRUD operations.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database for data storage.
- **JWT**: For token-based authentication.
- **bcrypt**: For password hashing and security.

## How to Run Locally

To run the Library App Backend locally on your machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/EngineerFranco/Library-App-Backend.git

2. **Navigate to the Project Directory:**:
   ```bash
   cd Library-App-Backend
3. **Install Dependencies:**:
   ```bash
   npm install
4. **Set Up Environment Variables:**:
 PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
5. **Run the Application:**:
   ```bash
   nodemon index.js

## .env and .gitignore
.env: Contains environment-specific variables for configuration. It should not be included in version control to keep sensitive information secure.
.gitignore: Ensure that your .env file is listed in your .gitignore to prevent it from being committed to your Git repository. Example .gitignore entry:

## API Endpoints
The backend provides a set of REST API endpoints that can be called by the React frontend. Refer to the API documentation for detailed information on available endpoints and their usage.

## Contribution
Feel free to contribute to this project by submitting issues or pull requests. Your feedback and suggestions are welcome!


