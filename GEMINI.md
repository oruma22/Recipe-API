# Recipe-API Project Context

A RESTful API for managing recipes, built with Node.js and Express, using MongoDB for data storage and Cloudinary for image management.

## Project Overview
- **Purpose**: Backend service for a recipe application supporting user authentication, role-based access control, and full CRUD for recipes.
- **Tech Stack**: 
    - **Runtime**: Node.js (ES Modules)
    - **Framework**: Express.js
    - **Database**: MongoDB via Mongoose
    - **Authentication**: JWT (JSON Web Tokens) & Bcrypt.js for password hashing
    - **File Handling**: Multer for uploads & Cloudinary for cloud storage
    - **Environment Management**: Dotenv

## Architecture
The project follows a modular structure:
- **`server.js`**: Application entry point, middleware configuration, and route registration.
- **`/Routes`**: Endpoint definitions (Auth, Recipes, Admin, Home, Images).
- **`/controllers`**: Business logic for each route.
- **`/models`**: Mongoose schemas for `User`, `Recipe`, and `Image`.
- **`/Middlewares`**: Authentication (`authMiddleware`), Role-based access (`isAdmin`), and File upload (`uploadMiddleware`).
- **`/config` & `/Database`**: External service configurations (Cloudinary, MongoDB).
- **`/helpers`**: Utility functions for Cloudinary operations.

## Building and Running
### Prerequisites
- Node.js installed.
- MongoDB instance (local or Atlas).
- Cloudinary account for image features.

### Commands
- **Install Dependencies**: `npm install`
- **Run Production**: `npm start`
- **Run Development**: `npm run dev` (uses `nodemon`)
- **Tests**: No tests currently specified in `package.json`.

### Environment Variables (.env)
Required keys (inferred):
- `PORT`: Server port (defaults to 3000)
- `MONGOOSE_URI`: MongoDB connection string
- `JWT_SECRET_KEY`: Secret for signing JWTs
- `CLOUDINARY_CLOUD_NAME`: Cloudinary configuration
- `CLOUDINARY_API_KEY`: Cloudinary configuration
- `CLOUDINARY_API_SECRET`: Cloudinary configuration

## Development Conventions
- **Modules**: Uses ES Modules (`import`/`export`).
- **API Responses**: Always returns JSON with a consistent structure: `{ success: boolean, message: string, data?: any }`.
- **Error Handling**: Standardized error logging and 500 status responses for internal errors.
- **Authentication**: 
    - JWTs are expected in the `Authorization` header as `Bearer <token>`.
    - `authMiddleware` attaches `decodedToken` to `req.userInfo`.
- **Authorization**:
    - `isAdmin` middleware checks `req.userInfo.role` for `"admin"`.
- **Validation**: Mongoose schemas include basic validation (required fields, max lengths, enums for categories).
