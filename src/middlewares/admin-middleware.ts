import type { Response, NextFunction } from "express";
import type { CustomRequest } from "./auth-middlewares.js";

const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { role } = req.userInfo || {};
  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized. Admin access required",
    });
  }
  next();
};

export default isAdmin;
