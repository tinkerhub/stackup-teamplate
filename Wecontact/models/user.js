const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name:String,
  phone: Number,
  email: String,
  place : String,
  category : String,
  code : String
})

const userSchema = {
    user_id : String ,
    email: String,
    password: String,
    contacts : [cardSchema]
    
  };
  
  const signup = mongoose.model("users", userSchema);

  module.exports = signup;