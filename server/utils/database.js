/**
 * MongoDB configuration and server connection using mongoose 
 */

const mongoose = require('mongoose');
const {MONGO_URL} = require('../config/config');

const conn = mongoose.createConnection(MONGO_URL, {useNewUrlParser: true, useCreateIndex: true});

conn.mongo = mongoose.mongo;

//Error
conn.on('error', function(err){
  console.log('Error connecting to database');
  console.log(err);
});

//Connected
conn.on('connected', function(){
  console.log('Connected to database');
});

module.exports = conn;