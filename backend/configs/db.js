const mongoose = require('mongoose');
const { handleStartupTasks } = require('../controllers/uploadController');
const deleteFile = require('../controllers/deleteController');
require("dotenv").config();


const mongodb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDB Connection Succeeded.');
        deleteFile();
    }
    catch(error){
        console.log('Error in DB connection: ' + error);
    }
}

module.exports = mongodb;