import Image from "../models/image.js";
import uploadToCloudinary from "../helpers/cloudinaryHelpers.js";

const uploadImage = async (req, res) => {
    try {
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
            data: newlyUploadedImage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const imageController = {
    uploadImage
};

export default imageController;