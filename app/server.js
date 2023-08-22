// Require Packages
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply cors
app.use(cors());

app.get('/', async (req, res, next) => {
    res.json({
        status: true,
        message: 'Welcome to common express structure'
    })
})

// routes
require('./routes')(app)

module.exports = app;