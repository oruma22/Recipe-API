import express from "express";
import type { Response } from "express";
import authMiddleware from "../middlewares/auth-middlewares.js";
import type { CustomRequest } from "../middlewares/auth-middlewares.js";

const router = express.Router();

// welcome route
router.get("/welcome", authMiddleware as any, (req: CustomRequest, res: Response) => {
  //need to send the user info from the auth-controller to the request
  const { username, role, userId } = req.userInfo;
  res.json({
    success: true,
    message: "Welcome to the Recipe API",
    user: {
      _id: userId,
      role,
      username,
    },
  });
});

export default router;
