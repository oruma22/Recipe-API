import { body, validationResult } from "express-validator";

const validateRecipe = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Recipe title is required")
    .isLength({ max: 100 })
    .withMessage("Recipe title cannot exceed 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Recipe description is required")
    .isLength({ max: 500 })
    .withMessage("Recipe description cannot exceed 500 characters"),
  body("ingredients").isArray({ min: 1 }).withMessage("At least one ingredient is required"),
  body("instructions").isArray({ min: 1 }).withMessage("At least one instruction is required"),
  body("prepTime")
    .isNumeric()
    .withMessage("Prep time must be a number")
    .isInt({ min: 0 })
    .withMessage("Prep time cannot be negative"),
  body("cookTime")
    .isNumeric()
    .withMessage("Cook time must be a number")
    .isInt({ min: 0 })
    .withMessage("Cook time cannot be negative"),
  body("servings")
    .isNumeric()
    .withMessage("Servings must be a number")
    .isInt({ min: 1 })
    .withMessage("Servings must be at least 1"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Beverage"])
    .withMessage("Invalid category"),
  body("image")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({ field: err.path, message: err.msg })),
      });
    }
    next();
  },
];

export { validateRecipe };
