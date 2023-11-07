const express = require('express');
const router = express.Router();
const {User} = require('../model/model');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const userHelper = require('../helpers/user-helper');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

//image upload
router.post('/upload',upload.single('image'),(req,res) => {

    const image = req.image;
    res.send(apiResponse({message: 'File uploaded successfully.', image}));
})

router.post('/data',(req,res) => {

    console.log(req.body);

    res.status(200).json({
        success : true,
        message : "success",
        user : user
    });

});


//Signup Method
router.post('/signup', async (req, res) => {

    //console.log(req.body);

    const isUser = await User.findOne({username:req.body.username});

    console.log(isUser);

    if(isUser === null)
    {
        req.body.password = await bcrypt.hash(req.body.password,10);

        User.create(req.body).then(response => {

            const user = {
                id : response._id,
                name : response.name,
                email : response.email,
            }

            res.status(200).json({
                success : true,
                message : "success",
                user : user
            });

        }).catch(err => {
            console.log(err.message);
        });
    }
    else
    {
        res.status(401).json(
            {
                success : false,
                message : "user already exists"
            }
        )
    }

});

//Login Method
router.post('/user-login',async (req,res) => {

    console.log(req.body);

    const user = await User.findOne({username:req.body.username});

    console.log("user : ",user);
    if(user !== null)
    {
        bcrypt.compare(req.body.password,user.password,(err,result) => {

            if(result)
            {
                const userData = {
                    id : user._id,
                    username : user.username,
                    email : user.email
                }
                res.status(200).json({
                    success:true,
                    user : userData,
                    message : "login successful"
                });
            }
            else{
                res.status(401).json({
                    success : false,
                    message : "invalid credentials"
                });
            }
        })
    }
    else{
        res.status(401).json({
            success : false,
            message : "invalid credentials"
        });
    }

})

//PUT Method.
router.put('/update-user',(req,res) => {

    res.send({
        type:'PUT'
    });
});

//DELETE METHOD.
router.delete('/delete-user',(req,res) => {
    res.send({
        type:'DELETE'
    })
});

module.exports = router;