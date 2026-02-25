//admin welcome page

import express from "express";
import authMiddleware from "../Middlewares/auth-middlewares.js";
import isAdmin from "../Middlewares/admin-middleware.js";


const router = express.Router();

// admin welcome route
router.get("/welcome", authMiddleware, isAdmin, (req, res) => {
    const { username, role, userId } = req.userInfo;
    res.json({
        success: true,
        message: "Welcome to the Recipe Admin page",
        user: {
            _id: userId,
            role,
            username
        }
    });
});

export default router;
