import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true,
        maxlength: [100, 'Recipe title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Recipe description is required'],
        trim: true,
        maxlength: [500, 'Recipe description cannot exceed 500 characters']
    },
    ingredients: {
        type: [String],
        required: [true, 'Recipe ingredients are required'],
    },
    instructions: {
        type: [String],
        required: [true, 'Recipe instructions are required'],
    },
    prepTime: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // url to the image
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage'],
    },
    // user that created the recipe
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Recipe', recipeSchema);