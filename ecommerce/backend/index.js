const express = require("express");
const app = express();
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
const PORT = 4000;
const authRouter = require("./routes/authRoute");
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/",(req , res)=>{
    res.send("hello from server side");
});
app.use("/api/user", authRouter);
app.listen(PORT, () => {
    console.log(`Server is running  at PORT ${PORT}`);
  });