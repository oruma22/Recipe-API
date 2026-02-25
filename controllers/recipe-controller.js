import Recipe from "../models/recipe.js";

const getAllRecipes = async (req, res) => {
    try {
        const allRecipes = await Recipe.find({});
        if (allRecipes.length) {
            return res.status(200).json({
                success: true,
                message: "Recipes fetched successfully",
                data: allRecipes
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No recipes found",
            });
        }

    } catch (error) {
        console.log(error, "Error fetching recipes");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        if (recipe) {
            return res.status(200).json({
                success: true,
                message: "Recipe fetched successfully with this id",
                data: recipe
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No recipe found with this id",
            });
        }

    } catch (error) {
        console.log(error, "Error fetching recipes by id");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });

    }
}

const createRecipe = async (req, res) => {
    try {
        const existingRecipe = await Recipe.findOne({ title: req.body.title });
        if (existingRecipe) {
            return res.status(400).json({
                success: false,
                message: "Recipe already exists",
            });
        } else {
            const newRecipe = await Recipe.create(req.body)
            if (newRecipe) {
                res.status(201).json({
                    success: true,
                    message: "Recipe created",
                    data: newRecipe
                });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null
        });
    }
}

const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (updatedRecipe) {
            return res.status(200).json({
                success: true,
                message: "Recipe updated successfully",
                data: updatedRecipe
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No recipe found with this id",
            });
        }

    } catch (error) {
        console.log(error, "Error updating recipe");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete({ _id: req.params.id });
        if (deletedRecipe) {
            return res.status(200).json({
                success: true,
                message: "Recipe deleted successfully",
                data: deletedRecipe
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No recipe found with this id",
            });
        }
    } catch (error) {
        console.log(error, "Error deleting recipe");
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const recipeController = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};

export default recipeController;
