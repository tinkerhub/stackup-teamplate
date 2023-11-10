var listData =[];
const express = require('express');
const app = express();
const path = require('path');
const mongoose= require('mongoose');
const session = require('express-session');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
var bodyParser = require('body-parser');
const { error, log } = require('console');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { render } = require("ejs");
const nodemailer = require('nodemailer')
const saltRound = 10;

const adminmodel = require('./models/admin')
const usersModel = require('./models/contacModel')
var searchresult=[]
var sortresult=[]
var mode;
var searchkey;
var sortkey;
app.use(bodyParser.urlencoded({ extended: false }));

const liveReloadServer = livereload.createServer(  );
liveReloadServer.watch(path.join(__dirname, "views"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 10);
});

app.use(connectLivereload());
let list2=[]
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
  secret:"123",
  saveUninitialized:true,
  resave:false
}))


app.get('/',async function(req,res){
  if(req.session.email){
    const data =await usersModel.findOne({email:req.session.email},{contacts:1})
    listData=data.contacts;
    //res.send(data)
    if(mode==='search'){
      res.render('home',{list:searchresult,search:searchkey,name:req.session.name});
    }else if(mode==='sort'){
      res.render('home',{list:sortresult,sort:sortkey,name:req.session.name});
    }else{
      res.render('home',{list:data.contacts,name:req.session.name});    
    }
  }else{
    res.redirect('/login')
  }
  
  
});
app.post('/sort',(req,res)=>{
  mode='sort'
  sortresult=[];
  sortkey=req.body.category;
  if(req.body.category==='Filter By All'){
    sortresult=listData;
  }else{
    listData.forEach(item=>{
      if(item.category===req.body.category){
        sortresult.push(item);
      }
    });
  }
  res.redirect('/');

});

app.post('/search',(req,res)=>{
  mode='search'
  searchresult=[];
  searchkey=req.body.search;
  if(req.body.search===''){
    searchresult=listData;
  }else{
    listData.forEach(item=>{
      if(item.name.toLowerCase().includes(req.body.search.toLowerCase())){
        searchresult.push(item);
      }
    });
  }
  res.redirect('/')
});
app.get('/addcontacts',(req,res)=>{
  console.log(req.query.error);
  res.render('addcontact',{exist_error:req.query.error});
  
});

app.post('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})
app.post('/logoutadmin',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

app.post('/edit',async function(req,res){
  const data =await usersModel.findOne({email:req.session.email,'contacts._id':req.body.contact_id},
  {
  'contacts.$': 1 
  }
  )

  res.render('editcontact',{data:data.contacts[0]});
});

app.get('/showadd',(req,res)=>{
  res.render('addcontact');
});

app.post('/delete',async function(req,res){
  console.log(req.body.co_id[1]);
  const deletef = await usersModel.findOneAndUpdate(
    {email:req.session.email},
    {$pull: { contacts: { _id: req.body.co_id[1] } }},
    {new:true}
  ).exec();
  res.redirect('/');
  

});

app.post('/checkdatanew',async(req,res)=>{
  const contactData =req.body;
  var newData = {
    name:contactData.name,
    phone:contactData.phone,
    email:contactData.email,
    place:contactData.place,
    category:contactData.category,
    code:contactData.code
  }
  console.log(contactData.category)
  
  const data =await usersModel.find
  ({email:req.session.email,$or:[{'contacts.email':contactData.email},{'contacts.phone':contactData.phone}]})

  console.log(data);
  if(data.length===0){
    const create = await usersModel.findOneAndUpdate(
      {email:req.session.email},
      {$push:{contacts:newData}},
      {new:true}
    ).exec();
    console.log('data added');
    res.status(201).json({ message: '/' });
  }else{
    res.status(201).json({ message: 'exist' });
  }
})


app.post('/checkdataedit',async function(req,res){
  var data;
  const status1=req.body.status1;
  const contact_id = req.body.contact_id;
  const name=req.body.name;
  const phone=req.body.phone;
  const email=req.body.email;
  const place=req.body.place;
  const category=req.body.category;
  const code=req.body.code;
  console.log(contact_id);
  if(status1==='email changed'){
    data =await usersModel.find({email:req.session.email,$or:[{'contacts.email':email}]})
  }else if(status1==='phone changed'){
    data =await usersModel.find({email:req.session.email,$or:[{'contacts.phone':phone}]})
  }else if(status1==='both changed'){
    data =await usersModel.find({email:req.session.email,$or:[{'contacts.phone':phone},{'contacts.email':email}]})
  }else{
    data =[]
  }
  console.log(data);
  if(data.length===0){
    const update = await usersModel.findOneAndUpdate(
      {email:req.session.email,'contacts._id':contact_id},
      {$set: {
        'contacts.$.name': name,
        'contacts.$.phone': phone,
        'contacts.$.email': email,
        'contacts.$.place': place,
        'contacts.$.category': category,
        'contacts.$.code': code
        }
      },
      {new:true}
    ).exec();
    console.log('data edited');
    res.status(201).json({ message: '/' });
  }else{
    res.status(201).json({ message: 'exist' });
  }

  
  
});

app.post('/getDetails',async(req,res)=>{
  const contactid =req.body.id;
  console.log(contactid);
  const data =await usersModel.findOne({email:req.session.email,'contacts._id':contactid},
  {'contacts.$': 1 })
  res.status(201).json({ message: data.contacts[0]});
  
})



app.get("/login", (req, res) => {
  if(req.session.email){
    res.redirect('/')
  }else{
    res.render(
      "Login",
      { errors: "" },
      (notexistinguser = ""),
      (invalidPassword = "")
    );
  }
  
});

app.get("/signup", (req, res) => {
  res.render("Signup", { errors: "" }, (alreadyexists = ""));
});

//signup validation part

app.post("/signup",
  [
    check("email")
      .isLength({ min: 1 })
      .withMessage("This field cannot be empty")
      .isEmail()
      .withMessage("Enter a valid email id"),
    check("password", "password has not been validated")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[0-9a-zA-Z\W_]{8,}$/i)
      .withMessage("must contain specific rules"),
    check("cpassword")
      .custom((cpassword, { req }) => {
        return cpassword === req.body.password;
      })
      .withMessage("Both passwords do not match"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { password,email, cpassword ,name } = req.body;


    try {
      const user = await usersModel.findOne({ email: req.body.email });

      if (user) {
        
        let alreadyexists = "This email is already in use";
        res.render("Signup", { errors: "", alreadyexists });
      } else if (!errors.isEmpty() || password !== cpassword) {
        res.render("Signup", { errors: errors.mapped(),email });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRound);

        const newnotes = new usersModel({
          user_id : name,
          email: req.body.email,
          password: hashedPassword,
        });
        newnotes.save();
        res.redirect("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.post("/userLogin", async (req, res) => {
  const { password, email } = req.body;

  const user = await usersModel.findOne({ email: req.body.email });
 

  if (!user) {
    var notexistinguser = "Incorrect email id";
    res.render("Login", { errors: "", notexistinguser, invalidPassword ,email});
  } else {
    
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.email = email;
      req.session.name = user.user_id
      res.redirect("/");
      
      
    } else {
      let invalidPassword = "Incorrect Password";
      res.render("Login", { errors: "", invalidPassword,email});
    }
  }

});


app.post("/adminLogin", async (req, res) => {
  const { password, email } = req.body;

  const user = await adminmodel.findOne({ email: req.body.email });
  if (!user) {
    var notexistinguser = "Incorrect email";
    res.render("Login", { errors: "", notexistinguser, invalidPassword });
  } else {
    
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.admin=email
      res.redirect('/admin');
    } else {
      
      let invalidPassword = "Incorrect Password.";
      res.render("Login", { errors: "", notexistinguser, invalidPassword });
    }
  }

});

//forgot password section
app.get("/resetPassword", async (req, res) => {
  res.render("otpRequest", { errors: "" }, (notexistinguser = ""));
});

app.post("/resetPassword", async (req, res) => {
  const { email } = req.body;
  const user = await usersModel.findOne({ email: req.body.email });


  if (!user) {
    var notexistinguser = "Incorrect email id";
    return res.render("otpRequest", { errors: "", notexistinguser });
  } else {
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 300000;
    
    req.session.otp = otp;
    req.session.email = email

  sendresetmail(email, otp);
  }
  

  res.render('otpValidation', { errors: ""}, notexistinguser='' )
});

app.post('/otpValidation',(req , res) => {
  const {otp,email} = req.body
  if(otp === req.session.otp){
    
    res.render("resetPage", { errors: "", alreadyexists:"" });

  }else{
    let errors ="Wrong OPT"
    res.render("otpValidation", { errors, alreadyexists:"" });
  }

  
})



app.post("/newpassword",[
  
  check("password", "password has not been validated")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[0-9a-zA-Z\W_]{8,}$/i)
    .withMessage("must contain specific rules"),
  check("cpassword")
    .custom((cpassword, { req }) => {
      return cpassword === req.body.password;
    })
    .withMessage("Both passwords do not match"),
],async ( req , res )=> {
  const { newpassword, newcpassword } = req.body;
  const errors = validationResult(req);
  
  if (newpassword !== newcpassword) {
    res.render("resetPage", { errors: errors.mapped() });


  }else{
    
    const newhashedPassword = await bcrypt.hash(newpassword, saltRound);
    usersModel.findOneAndUpdate(
      { email: req.session.email },
      { $set: { password: newhashedPassword } },
      { new: true }
    )
    .then(updatedUser => {
      if (updatedUser) {
        console.log('User updated:', updatedUser);
        
      } else {
        console.log('User not found or not updated');
        
      }
    })
    .catch(err => {
      console.error('Error:', err);
      
    });
    
    
      res.render(
        "Login",
        { errors: "" },
        (notexistinguser = ""),
        (invalidPassword = "")
      );
  }
})


//function to generate otp
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

//function to sendresetmail
function sendresetmail(email,otp){
  const transporter = nodemailer.createTransport({
    service:'outlook',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'weconnect-test-alex@outlook.com',
      pass: 'weconnect@123'
    }
  });

  
  const mailOptions = {
  from: 'weconnect-test-alex@outlook.com',
  to: email,
  subject: 'Password Reset',
  text: `To reset your weconnect password use this OTP : ${otp}`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}


var usersDetailsList = []
app.get('/admin',async(req,res)=>{
  if(req.session.admin){
    let users = await usersModel.find()
    usersDetailsList= users;
    let count = await usersModel.estimatedDocumentCount()
    res.render('admin',{users,count})

  }else{
    res.redirect('/')
    
  }
  
})
app.post('/admin/delete',async(req,res)=>{
  let userId= req.body.delete
  
  let deleteUser = await usersModel.findByIdAndDelete({'_id':userId})
  res.redirect('/admin') 
})
app.post('/admin',async(req,res)=>{
  var users=[]
  let searchValue =req.body.search
  let totalusers = await usersModel.find()
  totalusers.forEach((item)=>{
    if(item.user_id.toLowerCase().includes(searchValue.toLowerCase())){
    
     users.push(item)
    }
  })
  let count = await usersModel.estimatedDocumentCount()
  res.render('admin',{users,count,searchValue})
})
app.post('/admin/sort',async(req,res)=>{
  sortStatus =req.body.sortBy
  if(sortStatus=="a-z"){
    let users =usersDetailsList.sort(sortArrayAtoZ)
    let count = await usersModel.estimatedDocumentCount()
    res.render('admin',{users,count})
  }
  if(sortStatus=="z-a"){
    let users =usersDetailsList.sort(sortArrayZtoA)
    let count = await usersModel.estimatedDocumentCount()
    res.render('admin',{users,count})
  }
  if(sortStatus=="oldestfirst"){
    let count = await usersModel.estimatedDocumentCount()
    res.redirect('/admin')
  }
  if(sortStatus=="newestfirst"){
    let users =usersDetailsList.reverse()
    let count = await usersModel.estimatedDocumentCount()
    res.render('admin',{users,count})
  }
  function sortArrayAtoZ(a,b){
    if(a.user_id < b.user_id){
      return -1
    }
    if(a.user_id > b.user_id){
      return 1
    }
    return 0;
  }
  function sortArrayZtoA(a,b){
    if(a.user_id < b.user_id){
      return 1
    }
    if(a.user_id > b.user_id){
      return -1
    }
    return 0;
  }
})

app.listen(4000);
