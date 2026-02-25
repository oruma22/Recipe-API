import express from "express";
import authMiddleware from "../Middlewares/auth-middlewares.js";

const router = express.Router();

// welcome route
router.get("/welcome", authMiddleware, (req, res) => {
    //need to send the user info from the auth-controller to the request
    const { username, role, userId } = req.userInfo;
    res.json({
        success: true,
        message: "Welcome to the Recipe API",
        user: {
            _id: userId,
            role,
            username
        }
    });
});




export default router;