import express, { urlencoded } from 'express';
import cors from 'cors';
// const logininfo = require('../DataBase')

// import  './DataBase.js';
// const infof=require('./DataBase.js')
import infof from './DataBase.js'

import multer from 'multer';



const app=new express();
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(cors())

app.get("/",(req,res)=>{
    res.send('hi');
})


app.post("/donor", (req, res) => {
    var data = new infof.logininfo(req.body);
    data.save();
    res.send("donor created");
  });



app.get("/signup",(req , res) => {
    var data = new infof.sigininfo(req.body);
    data.save();
    res.send("signup sucessfully");
});

app.post("/add/product",(req,res)=>{
    var data = new infof.productinfo(req.body)
    data.save();
    res.send("product added sucessfully");
});



// app.get("/signup", (req, res) => {
//       sigininfo.find()
//     .then(SiginInfo => res.json(SiginInfo))
//     res(SiginInfo)
    
//   });

app.listen(5001,()=>{
    console.log("server is running")
});
