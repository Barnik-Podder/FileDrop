const express = require("express");
const { downloadFile, getFileDetails } = require("../controllers/downloadController");

const router = express.Router();

router.get("/:id", downloadFile);
router.get("/filedetails/:id", getFileDetails);

module.exports = router;
