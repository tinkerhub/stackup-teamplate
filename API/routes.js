// routes.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/User');
const Post = require('./models/Post');

const saltRounds = 10;
const secret = process.env.JWT_SECRET || 'fgawdquygkj287763';
const uploadMiddleware = multer({ dest: 'uploads/' });

// Signup route
exports.signup = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userDoc = await User.create({ username, password: hashedPassword });
        const token = jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).json({ token });
    } catch (e) {
        next(e);
    }
};

// Login route
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);

        if (passOk) {
            const token = jwt.sign({ username, id: userDoc._id }, secret, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true }).json(token);
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        next(error);
    }
};

// Create post route
exports.createPost = async (req, res, next) => {
    try {
        // ... (same as your original code)
    } catch (error) {
        next(error);
    }
};

// Get all posts route
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(posts);
    } catch (error) {
        next(error);
    }
};

// Get post by ID route
exports.getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const postDoc = await Post.findById(id).populate('author', ['username']);
        res.json(postDoc);
    } catch (error) {
        next(error);
    }
};
