var express = require('express');
var router = express.Router();
const userHelpers = require('../dbhelpers/user-helpers');
const productHelpers = require('../dbhelpers/product-helpers');


const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn)
    next();
  else{
      if(req.xhr){
        res.json({redirectTo:'/login'});
      }
      else
      {
        res.redirect('/login');
      }
  }
    
}
/* GET home page. */
router.get('/', async function(req, res, next) {
  let user = req.session.user;
  let categories = await productHelpers.getAllCategories();
  let highlights = await productHelpers.getHighlights();
  let cartCount = null;
  if(!user)
  {
    user.name = 'SignIn/SignUp'
    user.avatar = 'images/avatars/default_avatar.jpg'
  }
  else{
    cartCount=await userHelpers.getCartCount(req.session.user._id);
  }
  res.render('views/home', {categories,highlights,user,cartCount,admin:false});
});

router.get('/login', (req,res)=>{

  const initialTab = req.query.tab || 'login';

  if(req.session.loggedIn){
    res.redirect('/');
  }
  else{
    res.render('user/signin-signup',{loginErr:req.session.loginErr,initialTab});
    req.session.loginErr=false;
  }
});

router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true;
    req.session.user=req.body;
    res.redirect('/');
  }).catch((err)=>{
    res.render('user/signin-signup',{signupErr:err,initialTab:'signup'});
  })
});


router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true;
      req.session.user=response.user;
      res.redirect('/');
    }
    else{
      req.session.loginErr=" Invalid username or password.";
      res.redirect('/login');
    }
  });
});

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
