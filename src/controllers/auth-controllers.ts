import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import catchAsync from "../helpers/catchAsync.js";
import type { CustomRequest } from "../middlewares/auth-middlewares.js";

// register user
const registerUser = catchAsync(async (req: Request, res: Response) => {
  //extract user data from request body
  const { username, email, password, role } = req.body;

  //check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user and save in my database
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  //send response
  if (newUser) {
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Failed to create user",
    });
  }
});

// login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  //getting user login data
  const { username, password } = req.body;

  //check if the user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  //check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }
  // create user or bearer token
  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1h" },
  );

  //send response
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: user,
    token: accessToken,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

// change password
const changePassword = catchAsync(async (req: CustomRequest, res: Response) => {
  // this will give the current user id from the auth-middleware
  const userId = req.userInfo.userId;

  //extract old and new password
  const { oldPassword, newPassword } = req.body;

  //find current logged in user
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  //check if the old password is correct
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid old password",
    });
  }

  //hash new password
  const salt = await bcrypt.genSalt(10);
  const newHashedPassword = await bcrypt.hash(newPassword, salt);

  //update password
  user.password = newHashedPassword;
  await user.save();

  //send response
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

const authController = {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
};

export default authController;
