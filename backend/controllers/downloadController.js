const File = require("../models/Files");
const https = require("https");
const deleteFile = require('../controllers/deleteController');

const downloadFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({ message: "Link has expired or the link is wrong!" });
        }

        // Stream the file
        https.get(file.fileLink, (fileStream) => {
            fileStream.pipe(res);
        }).on("error", (err) => {
            console.error("Download error:", err.message);
            res.status(500).json({ message: "Error downloading file", error: err.message });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error :(", error: error.message });
    }
};

const getFileDetails = async(req, res)=>{
    try {

        const {id} = req.params;
        deleteFile();
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: "Link has expired or the link is wrong!" });
        }

        res.json({name: file.filename, size: file.size});
    } catch (error) {
        res.status(500).json({ message: "Server error :(", error: error.message });
    }
}

module.exports = { getFileDetails, downloadFile };