const express = require('express');
const { createPost, getAllPosts } = require('../controllers/post.controller');
const { isAuthenticated } = require('../../middleware/auth.middleware');
const router = express.Router();

// Anyone can see the posts
router.get('/', getAllPosts);

// Only logged-in users can create a post
router.post('/', isAuthenticated, createPost);

module.exports = router;