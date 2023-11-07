import { connect, Schema, model } from 'mongoose';
connect('mongodb://127.0.0.1:27017/ecommerce');



const schema=Schema;

var loginSchema=new schema({
    fname:String,
    lname:String,
    email:String,
    password:String,



})


var signupsSchema=new schema({

    email:String,
    password:String,
})







var productSchema = new schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    
})
  

var productinfo = model('ProductInfo',productSchema);
var logininfo = model('LoginInfo',loginSchema);
var sigininfo = model('SiginInfo',signupsSchema)
export default{ logininfo,sigininfo,productinfo};
