const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const upload = require('../middlewares/uploadMiddleware');
const deleteFile = require('../controllers/deleteController');
const router = express.Router();

// Upload route using Multer middleware
router.post('/upload', upload.single('file'), uploadFile);
router.get("/delete", (req, res) => {
    deleteFile();
    res.json({ message: "deleteFile task started" });
});

module.exports = router;
