const File = require('../models/Files');
const schedule = require('node-schedule');
const cloudinary = require('../configs/cloudinary');

// Upload file controller
const uploadFile = async (req, res) => {
    try {
        if (!req.file || !req.body.deleteAfter) {
            return res.status(400).json({ error: "File and deleteAfter time (in minutes) are required" });
        }

        const deleteAfter = parseInt(req.body.deleteAfter);

        if (isNaN(deleteAfter) || deleteAfter <= 0) {
            return res.status(400).json({ error: "Invalid deleteAfter value" });
        }

        // Extract Cloudinary file details
        const { path, size, filename, originalname } = req.file;

        // Calculate delete time (convert to UTC)
        const deleteAt = new Date(Date.now() + deleteAfter * 60 * 1000);

        // Save file details to MongoDB
        const newFile = new File({
            filename: originalname,
            size: size,
            format: originalname.split('.').pop(),
            fileLink: path,
            cloudinaryId: filename,
            deleteAt
        });

        await newFile.save();

        // Schedule deletion
        scheduleDeletion(newFile._id, newFile.cloudinaryId, deleteAt);

        res.json({
            message: "File uploaded successfully",
            id: newFile._id
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "File upload failed", details: error.message });
    }
};

// Function to determine Cloudinary resource type
const getResourceType = (filename) => {
    const extension = filename.split('.').pop().toLowerCase().trim();
    const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp", "tiff", "ico", "jfif", "avif", "eps", "psd", "ai"];
    const videoFormats = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "3gp", "ogg", "m4v", "mpeg", "mpg", "ts"];

    if (imageFormats.includes(extension)) return "image";
    if (videoFormats.includes(extension)) return "video";
    return "raw"; // PDFs, DOCX, ZIP, etc.
};

// Delete file function
const deleteFile = async (fileId, cloudinaryId) => {
    try {
        // Fetch file details from MongoDB
        const file = await File.findById(fileId);
        if (!file) {
            console.log(`File ${fileId} not found in database`);
            return;
        }

        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(cloudinaryId, { resource_type: getResourceType(file.filename) });

        if (result.result === "ok") {
            console.log(`Successfully deleted ${file.filename} from Cloudinary.`);
        } else {
            console.warn(`Cloudinary deletion failed for ${file.filename}`);
        }

        // Delete from MongoDB
        await File.findByIdAndDelete(fileId);
        console.log(`File ${fileId} deleted from Cloudinary and MongoDB`);

    } catch (error) {
        console.error("Error deleting file:", error.message);
    }
};

// Schedule file deletion (Ensures execution even if the server restarts)
const scheduleDeletion = (fileId, cloudinaryId, deleteAt) => {
    const delay = new Date(deleteAt).getTime() - Date.now();

    if (delay <= 0) {
        console.log("Skipping past deletion date...");
        deleteFile(fileId, cloudinaryId);
        return;
    }

    console.log(`Scheduled deletion for file ${fileId} at ${deleteAt}`);

    // Primary scheduler (node-schedule)
    schedule.scheduleJob(new Date(deleteAt), () => {
        deleteFile(fileId, cloudinaryId);
    });

    // Backup using setTimeout
    setTimeout(() => {
        deleteFile(fileId, cloudinaryId);
    }, delay);
};

// Run a scheduled cleanup job every 30 minutes (Handles missed deletions)
schedule.scheduleJob("*/30 * * * *", async () => {
    console.log("Running periodic file cleanup...");
    const expiredFiles = await File.find({ deleteAt: { $lt: new Date() } });

    for (let file of expiredFiles) {
        await deleteFile(file._id, file.cloudinaryId);
    }
});


// Reschedule pending deletions on server start
const rescheduleDeletions = async () => {
    const pendingFiles = await File.find({ deleteAt: { $gt: new Date() } });

    pendingFiles.forEach(file => {
        scheduleDeletion(file._id, file.cloudinaryId, file.deleteAt);
    });

    console.log(`Rescheduled ${pendingFiles.length} deletions.`);
};

// Run when server starts
rescheduleDeletions();

module.exports = { uploadFile };