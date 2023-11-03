const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/ecommerce_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

module.exports = dbConnect;