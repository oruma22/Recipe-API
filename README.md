# Recipe API

A simple CRUD back-end REST API built with Node.js and Express.js. It serves as the backend for a recipe application, allowing users to authenticate, browse, and manage recipes. It uses MongoDB (via Mongoose) as its database.

## Key Technologies & Dependencies

*   **Express**: The core web framework used for handling routing, middleware, and HTTP requests.
*   **Mongoose**: Used for object data modeling (ODM) to interact with the MongoDB database.
*   **JSON Web Token (`jsonwebtoken`)**: Used to generate and verify tokens for secure user authentication and authorization.
*   **Bcrypt.js**: Used for securely hashing user passwords before storing them in the database.
*   **Dotenv**: Manages environment variables (e.g., database connection string, JWT secrets).

## Architecture & Folder Structure

The project follows a standard modular architecture to keep code organized and maintainable:

*   `server.js`: The main entry point of the application.
*   `models/`: Defines the data schemas for the database (User and Recipe).
*   `Routes/`: Maps specific URL endpoints to their corresponding controller functions (auth, recipes, admin, home).
*   `controllers/`: Contains the core business logic.
*   `Middlewares/`: Custom middleware functions to intercept requests (auth and admin validation).
*   `Database/`: Handles the connection logic to the MongoDB instance.

## Core Features

*   **User Authentication**: Secure signup and login flows utilizing hashed passwords and JWTs.
*   **Recipe Management**: Standard CRUD functionality for recipes, tightly coupled with the User model so that recipes are owned by their authors.
*   **Role-Based Access Control (RBAC)**: Implementation of roles (regular users vs. admins), allowing the application to restrict certain actions (like deleting any recipe) to administrators only.
