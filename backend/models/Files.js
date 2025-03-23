const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    filename:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    format:{
        type: String,
        required: true
    },
    resourceType:{
        type: String,
        required: true
    },
    fileLink:{
        type: String,
        required: true
    },
    cloudinaryId:{
        type: String, 
        required: true
    },
    deleteAt:{
        type: Date,
        required: true
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('files', filesSchema)
