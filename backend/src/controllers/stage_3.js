const User = require('../models/User');
const validate = require ('../utilis/validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Enable MFA
const enableMFA = async (req, res) => {
    try{    
        const token = req.cookies.token;
        if(!token){
            throw new Error("Unauthorized Access");
        }       
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        const user = await User.findOne({emailId: decoded.emailId});
        if(!user){
            throw new Error("User not found");
        }           
        if(user.mfaEnabled){
            return res.status(400).json({ message: "MFA is already enabled" });
        }   
        user.mfaEnabled = true;
        await user.save();
        res.status(200).json({ message: "MFA enabled successfully" });
    }   
    catch(err){
        console.error(err);
        res.status(400).json({ error: err.message });
    }


}
// Verify MFA
const verifyMFA = async (req, res) => {             
    try{
        const token = req.cookies.token;    
        if(!token){
            throw new Error("Unauthorized Access");
        }
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        const user = await User.findOne({emailId: decoded.emailId});   
        if(!user){
            throw new Error("User not found");
        }   
        if(!user.mfaEnabled){
            return res.status(400).json({ message: "MFA is not enabled" });
        }
        // In real-world scenario, here we would verify the MFA code sent to user
        res.status(200).json({ message: "MFA verified successfully" });
    } catch(err){
        console.error(err);
        res.status(400).json({ error: err.message });
    }   
}

module.exports = { enableMFA, verifyMFA };