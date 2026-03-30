import type { Request, Response } from "express";
import Image from "../models/Image.js";
import uploadToCloudinary from "../helpers/cloudinaryHelpers.js";
import catchAsync from "../helpers/catchAsync.js";
import type { CustomRequest } from "../middlewares/auth-middlewares.js";

const uploadImage = catchAsync(async (req: CustomRequest, res: Response) => {
  //check if file exists
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
  //upload image to cloudinary
  const { url, public_id } = await uploadToCloudinary(req.file.path);

  // store image url and public id along with user id in database
  const newlyUploadedImage = await Image.create({
    url,
    public_id,
    recipe: req.body.recipe,
    uploadedBy: req.userInfo.userId,
  });

  //return response
  return res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    data: newlyUploadedImage,
  });
});

//fetch all images
const fetchAllImages = catchAsync(async (req: Request, res: Response) => {
  const images = await Image.find();
  res.status(200).json({
    success: true,
    message: "Images fetched successfully",
    data: images,
  });
});

const imageController = {
  uploadImage,
  fetchAllImages,
};

export default imageController;
