import express from "express";
import imageController from "../controllers/image-controller.js";
import authMiddleware from "../Middlewares/auth-middlewares.js";
import isAdmin from "../Middlewares/admin-middleware.js";
import upload from "../Middlewares/upload-middleware.js";

const router = express.Router();

//upload the image
router.post("/upload", authMiddleware, isAdmin, upload.single("image"), imageController.uploadImage);


//get all the images




export default router;