import express from "express";
import recipeController from "../controllers/recipe-controller.js";
import authMiddleware from "../Middlewares/auth-middlewares.js";
import isAdmin from "../Middlewares/admin-middleware.js";
import { validateRecipe } from "../Middlewares/validation-middleware.js";

const router = express.Router();

router.get("/get", recipeController.getAllRecipes);
router.get("/get/:id", recipeController.getRecipeById);

//logged in users can create recipes
router.post("/create", authMiddleware, validateRecipe, recipeController.createRecipe);

// only admin can update and delete recipes
router.put("/update/:id", authMiddleware, isAdmin, validateRecipe, recipeController.updateRecipe);
router.delete("/delete/:id", authMiddleware, isAdmin, recipeController.deleteRecipe);

export default router;
