import mongoose, { Document, Schema, Types } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  image: string;
  category: "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack" | "Beverage";
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      maxlength: [100, "Recipe title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Recipe description is required"],
      trim: true,
      maxlength: [500, "Recipe description cannot exceed 500 characters"],
    },
    ingredients: {
      type: [String],
      required: [true, "Recipe ingredients are required"],
    },
    instructions: {
      type: [String],
      required: [true, "Recipe instructions are required"],
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
      enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Beverage"],
    },
    // user that created the recipe
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Recipe = mongoose.model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
