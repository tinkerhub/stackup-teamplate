const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = dbConnect;
