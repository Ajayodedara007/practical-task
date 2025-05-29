require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DBConnect = require('./config/DBConnect');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
DBConnect()

// Middleware
app.use(cors({
    origin: '*', // allows any origin
}));
app.use(express.json());


app.use('/category', require('./routes/categories'))
app.use('/product', require('./routes/products'))


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});