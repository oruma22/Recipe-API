import Recipe from "../models/recipe.js";
import catchAsync from "../helpers/catchAsync.js";

const getAllRecipes = catchAsync(async (req, res) => {
  const allRecipes = await Recipe.find({}).populate("author", "username");
  if (allRecipes.length) {
    return res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      data: allRecipes,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No recipes found",
    });
  }
});

const getRecipeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id).populate("author", "username");
  if (recipe) {
    return res.status(200).json({
      success: true,
      message: "Recipe fetched successfully",
      data: recipe,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No recipe found with this id",
    });
  }
});

const createRecipe = catchAsync(async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings,
    image,
    category,
  } = req.body;
  const author = req.userInfo.userId;

  const existingRecipe = await Recipe.findOne({ title });
  if (existingRecipe) {
    return res.status(400).json({
      success: false,
      message: "Recipe already exists",
    });
  }

  const newRecipe = await Recipe.create({
    title,
    description,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings,
    image,
    category,
    author,
  });

  res.status(201).json({
    success: true,
    message: "Recipe created successfully",
    data: newRecipe,
  });
});

const updateRecipe = catchAsync(async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (updatedRecipe) {
    return res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: updatedRecipe,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No recipe found with this id",
    });
  }
});

const deleteRecipe = catchAsync(async (req, res) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
  if (deletedRecipe) {
    return res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      data: deletedRecipe,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "No recipe found with this id",
    });
  }
});

const recipeController = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};

export default recipeController;
