const File = require('../models/Files');
const schedule = require('node-schedule');
const cloudinary = require('../configs/cloudinary');

// Function to delete expired files
const deleteExpiredFiles = async () => {
    try {
        console.log("Checking for expired files...");

        const expiredFiles = await File.find({ deleteAt: { $lt: new Date() } });

        for (let file of expiredFiles) {
            await deleteFile(file._id, file.cloudinaryId);
        }

        console.log(`Deleted ${expiredFiles.length} expired files.`);
    } catch (error) {
        console.error("Error deleting expired files:", error.message);
    }
};

// Function to reschedule deletions for pending files
const reschedulePendingDeletions = async () => {
    try {
        console.log("Rescheduling pending deletions...");

        const pendingFiles = await File.find({ deleteAt: { $gt: new Date() } });

        for (let file of pendingFiles) {
            console.log(`Rescheduling deletion for ${file._id} at ${file.deleteAt}`);
            schedule.scheduleJob(file.deleteAt, async () => {
                await deleteFile(file._id, file.cloudinaryId);
            });
        }

        console.log(`Rescheduled ${pendingFiles.length} file deletions.`);
    } catch (error) {
        console.error("Error rescheduling deletions:", error.message);
    }
};

// Run cleanup function when the server starts
const handleStartupTasks = async () => {
    console.log("Running startup cleanup & rescheduling...");
    await deleteExpiredFiles();
    await reschedulePendingDeletions();
};

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

        const { path, size, filename, originalname } = req.file;

        // Calculate delete time
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
        schedule.scheduleJob(deleteAt, async () => {
            console.log(`Scheduled deletion for file ${newFile._id}`);
            await deleteFile(newFile._id, newFile.cloudinaryId);
        });

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

// Delete file controller
const deleteFile = async (fileId, cloudinaryId) => {
    try {
        const file = await File.findById(fileId);
        if (!file) {
            console.log(`File ${fileId} not found in database`);
            return;
        }

        const result = await cloudinary.uploader.destroy(cloudinaryId, { resource_type: getResourceType(file.filename) });

        if (result.result === "ok") {
            console.log(`Successfully deleted ${file.filename} from Cloudinary.`);
        } else {
            console.warn(`Cloudinary deletion failed for ${file.filename}`);
        }

        await File.findByIdAndDelete(fileId);
        console.log(`File ${fileId} deleted from Cloudinary and MongoDB`);

    } catch (error) {
        console.error("Error deleting file:", error.message);
    }
};

// Run a scheduled cleanup job every 30 minutes
schedule.scheduleJob("*/30 * * * *", async () => {
    console.log("Running periodic file cleanup...");
    await deleteExpiredFiles();
});

// Run cleanup & rescheduling on server start
handleStartupTasks();

module.exports = { uploadFile };
