const File = require('../models/Files');
const deleteFile = require('../controllers/deleteController');

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
        const { size, filename, originalname} = req.file;
        const fileLink = req.file.url || req.file.path; // Ensure Cloudinary URL is used
        const resourceType = req.fileResourceType;

        // Calculate delete time (convert to UTC)
        const deleteAt = new Date(Date.now() + deleteAfter * 60 * 1000);

        // Save file details to MongoDB
        const newFile = new File({
            filename: originalname,
            size: size,
            format: originalname.split('.').pop(),
            fileLink: fileLink,
            resourceType: resourceType,
            cloudinaryId: filename,
            deleteAt
        });

        await newFile.save();
        res.json({
            message: "File uploaded successfully",
            id: newFile._id
        });

        await deleteFile();


    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "File upload failed"});
    }
};

module.exports = { uploadFile };
