import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userInfo?: any;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. No token provided. Please login to continue",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.log(error, "Error decoding token");
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

export default authMiddleware;
