const mongoose= require('mongoose');
mongoose.set('strictQuery',false);

const db = mongoose
.connect("mongodb+srv://alexmathai07:Alexmathai07@cluster0.wyh8ssk.mongodb.net/sampledatabase?retryWrites=true&w=majority")
db.then(()=>{
    console.log('connected');
})


const contactschema = new mongoose.Schema(
    {
      
      name:String,
      phone:Number,
      email:String,
      place:String,
      category:String,
      code:String
    }
  );

  const userschema = new mongoose.Schema(
    {
      
      email:String,
      password:String,
      user_id:String,
      contacts:[contactschema]
    }
  );
  
  const usersModel = mongoose.model("users",userschema);

  module.exports=usersModel;