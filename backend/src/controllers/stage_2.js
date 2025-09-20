const User = require('../models/User');
const validate = require ('../utilis/validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//ChangePassword
const changePassword = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        if(!oldPassword || !newPassword){
            throw new Error("Old Password and New Password are required");
        }
        if(newPassword.length < 8){
            throw new Error("New Password must be at least 8 characters long");
        }
        const user = await User.findById(req.user._id);
        const match = await bcrypt.compare(oldPassword,user.password);
        if(!match){
            throw new Error("Old Password is incorrect");
        }
        user.password = await bcrypt.hash(newPassword,10);
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    }
    catch(err){
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

//ForgotPassword
const forgotPassword = async (req, res) => {
    try{
        const { emailId, newPassword } = req.body;  
        if(!emailId || !newPassword){
            throw new Error("Email and New Password are required");
        }
        if(newPassword.length < 8){
            throw new Error("New Password must be at least 8 characters long");
        }
        const user = await User.findOne({ emailId });
        if(!user){
            throw new Error("User not found");
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch(err){
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

//UpdateProfile
const updateProfile = async (req, res) => {
    try{
        const updates = req.body;   
        const allowedUpdates = ['firstName', 'lastName', 'age', 'mobileNumber'];
        const actualUpdates = Object.keys(updates);
        const isValidOperation = actualUpdates.every((update) => allowedUpdates.includes(update));  
        if(!isValidOperation){
            throw new Error("Invalid updates! You can only update: " + allowedUpdates.join(", "));
        }   
        if(updates.mobileNumber){
            updates.mobileNumber = await bcrypt.hash(updates.mobileNumber, 10);
        }
        const user = await User.findByIdAndUpdate(req.user._id, updates 
        , { new: true, runValidators: true });
        if(!user){
            throw new Error("User not found");
        }   
        res.status(200).json({ message: "Profile updated successfully", user });
    }
    catch(err){
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}

// DeleteAccount
const deleteAccount = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.user._id);
        if(!user){
            throw new Error("User not found");
        }
        res.status(200).json({ message: "Account deleted successfully" });
    }
    catch(err){
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}
module.exports = { changePassword, forgotPassword, updateProfile, deleteAccount };