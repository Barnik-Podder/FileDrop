const File = require('../models/Files');
const cloudinary = require('../configs/cloudinary');

const deleteFile = async () => {
    await File.find({ deleteAt: { $lt: new Date() } }).then((expiredFiles) => {
        expiredFiles.forEach(async (file) => {
            await cloudinary.uploader.destroy(file.cloudinaryId, { resource_type: file.resourceType })
                .then(() => File.findByIdAndDelete(file._id))
                .catch(err => console.error("Cloudinary delete error:", err));
        });
    }).catch(err => console.error("Database fetch error:", err));
};

module.exports = deleteFile;
