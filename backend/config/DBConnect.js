const mongoose = require('mongoose');
require('dotenv').config();

const DBConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://xyz:password@cluster0.s812d3n.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB successfully');

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        // process.exit(1);
    }
};

module.exports = DBConnect;