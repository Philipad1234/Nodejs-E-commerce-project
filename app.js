const express = require('express');
const path = require('path');
const ejs = require('ejs');
const dotenv = require('dotenv');
const mongoose = require('mongoose')


const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up dotenv
require('dotenv').config()

// connect to database
const uri = process.env.CONNECT

async function connect(){
    try {
        await mongoose.connect(uri)
        console.log('connected to MongoDB')
    }catch(error){
        console.error(error);
    }
  }

connect()

// Start server
const port=process.env.PORT


app.get('/', function(req, res){
    res.send('Working')
})


app.listen(port, function(){
    console.log('Server started on port ' + port)
})