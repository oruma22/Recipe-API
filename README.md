# Recipe API

A robust RESTful API built with Node.js and Express.js for managing recipes. This project features JWT-based authentication, role-based access control, automated testing, and cloud-based image storage.

## Key Features

*   **Secure Authentication**: JWT-based auth flow with password hashing (Bcrypt.js).
*   **Role-Based Access Control (RBAC)**: Support for User and Admin roles.
*   **Recipe Management**: Complete CRUD operations for recipes.
*   **Input Validation**: Strict request validation using `express-validator`.
*   **Global Error Handling**: Centralized error management for consistent API responses.
*   **Image Management**: Integrated with Cloudinary for secure image uploads and retrieval.
*   **Automated Testing**: Integration tests using Jest, Supertest, and an in-memory MongoDB server.
*   **Developer Experience**: Pre-configured ESLint and Prettier for consistent code quality.

## Tech Stack

*   **Runtime**: Node.js (ES Modules)
*   **Framework**: Express.js
*   **Database**: MongoDB (via Mongoose)
*   **Storage**: Cloudinary
*   **Testing**: Jest & Supertest
*   **Security**: JWT & Bcrypt.js

## Getting Started

### Prerequisites

*   Node.js (v18+)
*   MongoDB instance
*   Cloudinary account

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    ```bash
    cp .env.example .env
    # Then edit .env with your actual credentials
    ```

### Running the Application

*   **Development**: `npm run dev`
*   **Production**: `npm start`
*   **Tests**: `npm test`
*   **Linting**: `npm run lint`

## API Endpoints

### Auth
*   `POST /api/auth/register` - Register a new user
*   `POST /api/auth/login` - Login and receive a JWT

### Recipes
*   `GET /api/recipes/get` - Fetch all recipes
*   `GET /api/recipes/get/:id` - Fetch a single recipe by ID
*   `POST /api/recipes/create` - Create a new recipe (Auth required)
*   `PUT /api/recipes/update/:id` - Update a recipe (Admin only)
*   `DELETE /api/recipes/delete/:id` - Delete a recipe (Admin only)

---
*Developed as a professional portfolio project showcasing back-end engineering best practices.*