import cloudinary from "../config/cloudinary.js"; // Import the configured Cloudinary instance

/**
 * Uploads a local file to Cloudinary.
 * 
 * @param {string} filepath - The local path to the file that needs to be uploaded.
 * @returns {Promise<Object>} Returns an object containing the secure URL and the public ID of the uploaded image.
 * @throws {Error} Throws an error if the upload process fails.
 */
const uploadToCloudinary = async (filepath) => {
    try {
        // Use the cloudinary uploader to upload the file
        const uploadStream = await cloudinary.uploader.upload(filepath);

        // Return only the necessary information (URL and ID)
        return {
            url: uploadStream.secure_url,
            public_id: uploadStream.public_id,
        }
    } catch (error) {
        // Log the exact error message for debugging purposes
        console.error("Error uploading to cloudinary", error.message);
        // Throw a generic error to be handled by the calling controller
        throw new Error("Failed to upload image to cloudinary");
    }
}

export default uploadToCloudinary;