const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configs/cloudinary');

// Function to determine the resource type
const getResourceType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase().trim();
    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "ico", "jfif", "avif", "eps", "psd", "ai"];
    const videoFormats = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "3gp", "ogg", "m4v", "mpeg", "mpg", "ts"];

    if (imageFormats.includes(extension)) return "image";
    if (videoFormats.includes(extension)) return "video";
    return "raw"; // PDFs, DOCX, ZIP, etc.
};

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const resourceType = getResourceType(file.originalname);
        req.fileResourceType = resourceType; // Store resource_type in req
        return {
            folder: 'uploads',
            resource_type: resourceType,
            public_id: `${Date.now()}-${file.originalname}`
        };
    },
});

// File filter (accept all file types)
const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
