const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postblogs = require('./routes/post_routes');
const getblogs = require('./routes/get_routes');
app.use(bodyParser.json());

const db = mongoose.connect("mongodb+srv://onewater:onewater123@cluster0-hmjdu.mongodb.net/onewater")
  .then(() => {
    console.log("Connection to MongoDB is Successfull (Users Auth Collection) !");
  })
  .catch(() => {
    console.log("Connection to Database Failed !");
  });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,Null"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  next();
});

app.get('/', (req, res) => {
  res.json({
    "Message": "Connected TO OneWater User Authentication"
  })
})

app.use('', postblogs);
app.use('', getblogs);
module.exports = app;
