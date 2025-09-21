const { User } = require('../models/User.model');
const { decrypt, encrypt } = require('../../utils/crypto');
const ApiResponse = require('../../utils/ApiResponse');
const bcrypt = require('bcrypt');

const getMyProfile = async (req, res) => {
    // req.user is attached by the isAuthenticated middleware
    const user = req.user;
    
    const decryptedUser = {
        ...user.toObject(),
        aadharNumber: decrypt(user.aadharNumber),
        mobileNumber: decrypt(user.mobileNumber)
    };
    
    return res.status(200).json(new ApiResponse(200, decryptedUser, "Profile fetched successfully"));
};

const updateMyProfile = async (req, res) => {
    try {
        const { firstName, lastName, age } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { firstName, lastName, age }, { new: true, runValidators: true }).select("-password");
        return res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const changeMyPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword || newPassword.length < 8) {
            return res.status(400).json({ error: "Invalid input" });
        }

        const user = await User.findById(req.user._id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect old password" });
        }
        
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        
        return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { getMyProfile, updateMyProfile, changeMyPassword };