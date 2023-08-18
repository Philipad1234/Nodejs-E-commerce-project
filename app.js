const express = require('express');
const path = require('path');
const ejs = require('ejs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');
const expressValidator = require('express-validator');
const pages = require('./routes/pages')
const adminPages = require('./routes/adminPages')

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set global errors variables
app.locals.errors = null;

// Set up sessions
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// Set up dotenv
require('dotenv').config()

// connect to database
const uri = process.env.CONNECT



async function connect() {
    try {
        await mongoose.connect(uri)
        console.log('connected to MongoDB')
    } catch (error) {
        console.error(error);
    }
}

connect()

app.use(expressValidator());

// Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Setting up body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// Start server
const port = process.env.PORT

app.use('/', pages);
app.use('/admin/pages', adminPages);

app.listen(port, function () {
    console.log('Server started on port ' + port)
})