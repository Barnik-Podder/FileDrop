const express = require('express');
const cors = require('cors');
const mongoDB = require('./configs/db');
const uploadRoute = require('./routes/uploadRoute');
const downloadRoute = require('./routes/downloadRoute');
require('dotenv').config();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set
const app = express();

// Middleware
app.use(cors({
    origin: ["https://filedrop-share.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true
}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Connect to MongoDB
mongoDB();

// Routes
app.get('/', (req, res) => {
    res.send("You are trying to access the backend over HTTP");
});

app.use('/api', uploadRoute);
app.use('/download', downloadRoute);

// Start the server for local development
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for Vercel
module.exports = app;
