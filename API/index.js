const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const app = express();
const User = require('./models/User');
const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET || 'fgawdquygkj287763';
const fs = require('fs');
const Post = require('./models/post');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tzzkenz:eginiyil@cluster0.ikunxgz.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });
  

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    const token = jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true }).json({ token });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'registration failed' });
  }
});

// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const userDoc = await User.findOne({ username });

//     if (!userDoc) {
//       res.status(401).json({ error: 'User not found' });
//       return;
//     }

//     const passOk = bcrypt.compareSync(password, userDoc.password);

//     if (passOk) {
//       const token = jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '1h' });
//       res.cookie('token', token, { httpOnly: true }).json({ success: true });
//     } else {
//       res.status(401).json({ error: 'Invalid password' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, (err, info) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Token verification failed' });
    }

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.get('/post', async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
