const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

// Upload route using Multer middleware
router.post('/upload', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            // Handle Multer errors
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File size exceeds the limit of 100MB.' });
            }
            return res.status(500).json({ error: err.message });
        }
        next();
    });
}, uploadFile);

module.exports = router;
