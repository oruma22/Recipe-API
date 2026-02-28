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

//configure multer