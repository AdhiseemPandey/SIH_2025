const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.model');
const { encrypt, decrypt } = require('../../utils/crypto');
const ApiResponse = require('../../utils/ApiResponse');

const register = async (req, res) => {
    try {
        let { firstName, lastName, emailId, age, aadharNumber, mobileNumber, password } = req.body;
        
        const encryptedAadhar = encrypt(aadharNumber);
        const encryptedMobile = encrypt(mobileNumber);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName, lastName, emailId, age,
            aadharNumber: encryptedAadhar,
            mobileNumber: encryptedMobile,
            password: hashedPassword
        });
        
        return res.status(201).json(new ApiResponse(201, { email: user.emailId }, "User registered successfully"));
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) return res.status(400).json({ error: "Email and password are required" });

        const user = await User.findOne({ emailId });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const tokenPayload = { _id: user._id, role: user.role };
        const token = jwt.sign(tokenPayload, process.env.JWT_KEY, { expiresIn: '1d' });
        
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.status(200).json(new ApiResponse(200, { role: user.role }, "Login successful"));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
};

module.exports = { register, login, logout };