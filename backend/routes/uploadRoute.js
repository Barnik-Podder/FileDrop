const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Upload route using Multer middleware
router.post('/upload', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            if (err.message.includes('File size too large')) {
                return res.status(400).json({ error: "File size exceeds the limit." });
            }
            return res.status(500).json({ error: err.message });
        }
        next();
    });
}, uploadFile);

module.exports = router;
