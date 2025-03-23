const File = require('../models/Files');
const schedule = require('node-schedule');
const deleteFile = require('../controllers/deleteController');

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
        const { path, size, filename, originalname, } = req.file;
        const { resource_Type } = req.fileResourceType;        

        // Calculate delete time (convert to UTC)
        const deleteAt = new Date(Date.now() + deleteAfter * 60 * 1000);

        // Save file details to MongoDB
        const newFile = new File({
            filename: originalname,
            size: size,
            format: originalname.split('.').pop(),
            fileLink: path,
            resouseType: resource_Type,
            cloudinaryId: filename,
            deleteAt
        });

        await newFile.save();
        deleteFile();
        res.json({
            message: "File uploaded successfully",
            id: newFile._id
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "File upload failed", details: error.message });
    }
};

module.exports = {uploadFile};
