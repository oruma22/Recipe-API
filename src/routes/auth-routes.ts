import express from "express";
import authController from "../controllers/auth-controllers.js";
import authMiddleware from "../middlewares/auth-middlewares.js";

const router = express.Router();

// auth routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/change-password", authMiddleware as any, authController.changePassword);

export default router;
