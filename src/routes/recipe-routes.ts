import express from "express";
import recipeController from "../controllers/recipe-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import isAdmin from "../middlewares/admin-middleware.js";
import { validateRecipe } from "../middlewares/validation-middleware.js";

const router = express.Router();

router.get("/get", recipeController.getAllRecipes);
router.get("/get/:id", recipeController.getRecipeById);

//logged in users can create recipes
router.post("/create", authMiddleware as any, validateRecipe, recipeController.createRecipe);

// only admin can update and delete recipes
router.put("/update/:id", authMiddleware as any, isAdmin as any, validateRecipe, recipeController.updateRecipe);
router.delete("/delete/:id", authMiddleware as any, isAdmin as any, recipeController.deleteRecipe);

export default router;
