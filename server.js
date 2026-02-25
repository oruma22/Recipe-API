//Main Sever Entry point

import express from "express";
import "dotenv/config";

const app = express();
import connectDB from "./Database/database.js";
import recipeRouter from "./Routes/recipe-routes.js";
import authRouter from "./Routes/auth-routes.js";
import homeRouter from "./Routes/home-routes.js";
import adminRouter from "./Routes/admin-routes.js";

const PORT = process.env.PORT || 3000;

//connecting the database to main entry server
connectDB();

//middleware -> express.json
app.use(express.json());

//routes here
app.use("/api/recipes", recipeRouter);
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
