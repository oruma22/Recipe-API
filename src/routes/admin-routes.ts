import express from "express";
import type { Response } from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import type { CustomRequest } from "../middlewares/auth-middlewares.js";
import isAdmin from "../middlewares/admin-middleware.js";

const router = express.Router();

// admin welcome route
router.get("/welcome", authMiddleware as any, isAdmin as any, (req: CustomRequest, res: Response) => {
  const { username, role, userId } = req.userInfo;
  res.json({
    success: true,
    message: "Welcome to the Recipe Admin page",
    user: {
      _id: userId,
      role,
      username,
    },
  });
});

export default router;
