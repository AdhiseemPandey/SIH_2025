const Post = require('../models/Post.model');
const ApiResponse = require('../../../utilis/ApiResponse');

const createPost = async (req, res) => {
    try {
        const { title, description, location, image } = req.body;
        const newPost = await Post.create({
            title, description, location, image,
            createdBy: req.user._id
        });
        return res.status(201).json(new ApiResponse(201, newPost, "Post created successfully"));
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('createdBy', 'firstName lastName');
        return res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createPost, getAllPosts };