const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const createUser = asyncHandler(async (req, res) => {
    try {
      // Extract email from the request body
      const email = req.body.email;
  
      // Check if a user with the given email already exists in the database
      const findUser = await User.findOne({ email: email });
  
      if (!findUser) {
        // If user not found, create a new user using the request body
        const newUser = await User.create(req.body);
        res.json(newUser); // Send the newly created user as the response
      } else {
        // If user found, throw an error indicating that the user already exists
        throw new Error("User Already Exists");
      }
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(400).json({ message: error.message }); // Send an error response with the error message
    }
  });

  module.exports = {createUser}