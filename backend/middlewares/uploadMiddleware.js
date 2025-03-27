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

const sanitizeFilename = (filename) => {
    return filename
        .replace(/[^a-zA-Z0-9-_\.]/g, '_') // Replace invalid characters with underscores
        .toLowerCase(); // Optionally convert to lowercase
};

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const resourceType = getResourceType(file.originalname);
        req.fileResourceType = resourceType; // Store resource_type in req

        const sanitizedFilename = sanitizeFilename(file.originalname);

        return {
            folder: 'uploads',
            resource_type: resourceType,
            public_id: `${Date.now()}-${sanitizedFilename}`
        };
    },
});

// File filter (accept all file types)
const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }
});

module.exports = upload;
