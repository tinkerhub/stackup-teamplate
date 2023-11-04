import Express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';

const app=Express();

app.use(Express.json());
app.use(Express.urlencoded({extended:true}));
app.use(cors);

const CONNECTION_URL='mongodb+srv://new-user-002:new-user-002pass@cluster0.uiriblh.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT,() => console.log(`Server at port: ${PORT} `)))
    .catch((error) => console.log(error.message));

app.get('/',(req,res)=>{

})


