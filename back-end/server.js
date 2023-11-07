const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoute = require('./routes/admin-router');
const userRoute = require('./routes/user-router');
require("dotenv").config();

//use
const app = express();

//connect mongodb
mongoose.connect('mongodb://127.0.0.1:27017/stackup', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

mongoose.Promise = global.Promise;

//static files
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//route
app.use('/api/admin', adminRoute);
app.use('/api/user',userRoute);

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})