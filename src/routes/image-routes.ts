import express from "express";
import imageController from "../controllers/image-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";
import isAdmin from "../middlewares/admin-middleware.js";
import upload from "../middlewares/upload-middleware.js";

const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware as any,
  isAdmin as any,
  upload.single("image"),
  imageController.uploadImage,
);

//get all the images
router.get("/images", authMiddleware as any, imageController.fetchAllImages);

export default router;
