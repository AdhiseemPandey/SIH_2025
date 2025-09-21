const { User } = require('../models/User.model');
const Post = require('../models/Post.model');
const ApiResponse = require('../../utils/ApiResponse');

// Admin & Superadmin
const verifyPost = async (req, res) => {
    try {
        const { status } = req.body; // e.g., "Processing", "Completed"
        if (!['Processing', 'Completed', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }
        const post = await Post.findByIdAndUpdate(req.params.id, {
            status,
            managedBy: req.user._id
        }, { new: true });
        if (!post) return res.status(404).json({ error: "Post not found" });

        return res.status(200).json(new ApiResponse(200, post, "Post status updated"));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Superadmin only
const deleteAnyPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        return res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully by superadmin"));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const manageAdmin = async (req, res) => {
    try {
        const { userId, action } = req.body; // action can be "promote" or "demote"
        if (!['promote', 'demote'].includes(action)) {
             return res.status(400).json({ error: "Invalid action" });
        }

        const role = action === 'promote' ? 'admin' : 'user';
        const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
        if (!user) return res.status(404).json({ error: "User not found" });
        
        return res.status(200).json(new ApiResponse(200, { email: user.emailId, role: user.role }, `User role updated to ${role}`));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { verifyPost, deleteAnyPost, manageAdmin };