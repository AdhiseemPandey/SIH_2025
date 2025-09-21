const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.DB_CONNECT_STRING);
    console.log("Database connected successfully.");
};

module.exports = connectDB;