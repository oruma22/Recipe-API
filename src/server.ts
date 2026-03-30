//Main Sever Entry point

import express from "express";
import type { Application } from "express";
import "dotenv/config";

import connectDB from "./database/database.js";
import recipeRouter from "./routes/recipe-routes.js";
import authRouter from "./routes/auth-routes.js";
import homeRouter from "./routes/home-routes.js";
import adminRouter from "./routes/admin-routes.js";
import imageRouter from "./routes/image-routes.js";
import globalErrorHandler from "./middlewares/error-middleware.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

//connecting the database to main entry server
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

//middleware -> express.json
app.use(express.json());

//routes here
app.use("/api/recipes", recipeRouter);
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/images", imageRouter);

// Global Error Handler
app.use(globalErrorHandler as any);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
