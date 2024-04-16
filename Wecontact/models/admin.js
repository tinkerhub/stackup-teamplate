const mongoose = require("mongoose");


const adminschema = {
    
    email: String,
    password: String,
    
  };
  
  const admin = mongoose.model("admins", adminschema);

  module.exports = admin;