const express = require('express');
const { uploadFile } = require('../controllers/uploadController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Upload route using Multer middleware
router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;
