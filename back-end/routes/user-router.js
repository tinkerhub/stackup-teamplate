const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, Contact } = require('../model/model');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const userHelper = require('../helpers/user-helper');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile');
    },
    filename: function (req, file, cb) {
        const userId = req.body.id; // Assuming user ID is available in req.body
        const originalName = file.originalname;
        const fileExtension = originalName.split('.').pop(); // Get the file extension
        const uniqueFileName = `${userId}.${fileExtension}`;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage: storage });

function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}

// Ensure the "public/profile" directory exists
const fs = require('fs');
const profileDirectory = 'public/profile';
if (!fs.existsSync(profileDirectory)) 
{
    fs.mkdirSync(profileDirectory, { recursive: true });
}

// Add a new route to update a contact by ID
router.put('/update-contact', async (req, res) => {
    try {
      const userId = req.body.userId;
      const contactId = req.body.contactId;
  
      // Find the user profile by user ID
      let userProfile = await Contact.findById(userId);
  
      if (!userProfile) {
        return res.status(404).send(apiResponse({ message: 'User profile not found.' }));
      }
  
      // Find the contact to update in the user's contacts
      const contactToUpdate = userProfile.contacts.id(contactId);
  
      if (!contactToUpdate) {
        return res.status(404).send(apiResponse({ message: 'Contact not found.' }));
      }
  
      // Update the contact data with the request body
      if (req.body.name) {
        contactToUpdate.name = req.body.name;
      }
      if (req.body.email) {
        contactToUpdate.email = req.body.email;
      }
      if (req.body.phone) {
        contactToUpdate.phone = req.body.phone;
      }
      if (req.body.address) {
        contactToUpdate.address = req.body.address;
      }
  
      // Save the updated user profile
      await userProfile.save();
  
      return res.send(apiResponse({ message: 'Contact updated successfully.', contact: contactToUpdate }));
    } catch (error) {
      console.error(error);
      res.status(500).send(apiResponse({ message: 'Error processing the request.' }));
    }
  });
  

// Add a new route to delete a contact by ID
router.delete('/delete-contact', async (req, res) => {
    try {
      const userId = req.body.userId;
      const contactId = req.body.contactId;

      console.log(userId,contactId);
  
      // Find the user profile by user ID
      let userProfile = await Contact.findById(userId);
  
      if (!userProfile) {
        return res.status(404).send(apiResponse({ message: 'User profile not found.' }));
      }
  
      // Find the index of the contact to delete
      const contactIndex = userProfile.contacts.findIndex((contact) => contact._id.toString() === contactId);
  
      if (contactIndex === -1) {
        return res.status(404).send(apiResponse({ message: 'Contact not found.' }));
      }
  
      // Remove the contact from the user's profile
      userProfile.contacts.splice(contactIndex, 1);
  
      // Save the updated user profile
      await userProfile.save();
  
      return res.send(apiResponse({ message: 'Contact deleted successfully.' }));
    } catch (error) {
      console.error(error);
      res.status(500).send(apiResponse({ message: 'Error processing the request.' }));
    }
  });
  

router.get('/get-contacts',async (req,res) => {
    
    const userId = req.body.id;
    const isUser = await Contact.findOne({ _id: userId });

    console.log("contacts : ",isUser);

    if(isUser !== null)
    {
        res.status(200).json({
            success: true,
            message: "success",
            contacts : isUser.contacts
        });
    }
    else
    {
        res.status(401).json(
            {
                success: false,
                message: "user already exists"
            }
        )
    }

})

// Image upload
router.post('/add-contact', upload.single('image'), async (req, res) => {

    if (!req.file) {
        // Handle the case where no file was uploaded
        res.status(400).send(apiResponse({ message: 'No file uploaded.' }));
        return;
    }

    const userId = req.body.id; // Assuming user ID is available in req.body
    const image = req.file; // Access the uploaded file info
    const contactData = req.body;

    console.log("user id : ", userId);
    console.log("image : ", image);
    console.log("contact : ", contactData);

    try {
        let userProfile = await Contact.findById(userId);

        if (!userProfile) {
            // Create a new user profile if it doesn't exist
            userProfile = new Contact({ _id: userId, contacts: [] });
        }

        // Create a new contact document with a unique ID
        const newContact = {
            _id: new mongoose.Types.ObjectId(),
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            address: contactData.address
        };

        // Save the uploaded image with the name the same as the contact's ID
        const imageExtension = image.originalname.split('.').pop();
        const imageFileName = `${newContact._id.toString()}.${imageExtension}`;

        const oldFilePath = `public/profile/${userId}.${imageExtension}`; // Replace with the path to the old image file
        const newFilePath = `public/profile/${imageFileName}`; // Replace with the desired new path and name for the image

        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                console.error('Error renaming the image:', err);
            } else {
                console.log('Image renamed successfully');
            }
        });

        userProfile.contacts.push(newContact);

        // Save the updated user profile
        await userProfile.save();

        res.send(apiResponse({ message: 'File uploaded successfully.', image }));
    } catch (error) {
        console.error(error);
        res.status(500).send(apiResponse({ message: 'Error processing the request.' }));
    }
});


//Signup Method
router.post('/signup', async (req, res) => {

    //console.log(req.body);

    const isUser = await User.findOne({ username: req.body.username });

    console.log(isUser);

    if (isUser === null) {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        User.create(req.body).then(response => {

            const user = {
                id: response._id,
                username: response.username,
                email: response.email,
            }

            res.status(200).json({
                success: true,
                message: "success",
                user: user
            });

        }).catch(err => {
            console.log(err.message);
        });
    }
    else {
        res.status(401).json(
            {
                success: false,
                message: "user already exists"
            }
        )
    }

});

//Login Method
router.post('/login', async (req, res) => {

    console.log(req.body);

    const user = await User.findOne({ username: req.body.username });

    console.log("user : ", user);
    if (user !== null) {
        bcrypt.compare(req.body.password, user.password, (err, result) => {

            if (result) {
                const userData = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                res.status(200).json({
                    success: true,
                    user: userData,
                    message: "login successful"
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    message: "invalid credentials"
                });
            }
        })
    }
    else {
        res.status(401).json({
            success: false,
            message: "invalid credentials"
        });
    }

})

module.exports = router;