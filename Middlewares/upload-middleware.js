import multer from "multer";
import path from "path";

//configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null,

            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
});

//file type checker to know incase a user uploads a non image file
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only images are allowed."), false);
    }
}

//configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, //10MB
    },
});

export default upload;