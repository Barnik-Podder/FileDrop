const mongoose = require('mongoose');
const { handleStartupTasks } = require('../controllers/uploadController')
require("dotenv").config();


const mongodb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDB Connection Succeeded.');
        await handleStartupTasks();
    }
    catch(error){
        console.log('Error in DB connection: ' + error);
    }
}

module.exports = mongodb;