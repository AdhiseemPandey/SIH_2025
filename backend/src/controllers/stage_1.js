
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const  validate  = require('../utilis/validator');
const { encrypt, decrypt } = require('../utilis/crypto');

// ===== REGISTER =====
const register = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        let { firstName, lastName, emailId, age, aadharNumber, mobileNumber, password } = req.body;

        // Regex validation on raw input
        if (!/^\d{12}$/.test(aadharNumber)) return res.status(400).json({ error: "Aadhaar must be 12 digits" });
        if (!/^(\+91)?\d{10}$/.test(mobileNumber)) return res.status(400).json({ error: "Mobile must be 10 digits" });

        // Encrypt sensitive data
        const encryptedAadhar = encrypt(aadharNumber);
        const encryptedMobile = encrypt(mobileNumber);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            emailId,
            age,
            aadharNumber: encryptedAadhar,
            mobileNumber: encryptedMobile,
            password: hashedPassword
        });

        const token = jwt.sign({ _id: user._id, emailId }, process.env.JWT_KEY, { expiresIn: 60*45 });
        res.cookie('token', token, { maxAge: 1000*60*45, httpOnly: true });

        res.status(201).json({ message: "User registered successfully", user });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

// ===== LOGIN =====
const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) return res.status(400).json({ error: "Email and password required" });

        const user = await User.findOne({ emailId });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ _id: user._id, emailId }, process.env.JWT_KEY, { expiresIn: 60*45 });
        res.cookie('token', token, { maxAge: 1000*60*45, httpOnly: true });

        res.status(200).json({ message: "User logged in successfully", user });

    } catch (err) {
        console.error(err);
        res.status(401).json({ error: err.message });
    }
};

// ===== LOGOUT =====
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

// ===== GET PROFILE =====
const getProfile = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ emailId: decoded.emailId });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Decrypt sensitive fields
        const decryptedUser = {
            ...user.toObject(),
            aadharNumber: decrypt(user.aadharNumber),
            mobileNumber: decrypt(user.mobileNumber)
        };

        res.status(200).json({ user: decryptedUser });

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { register, login, logout, getProfile };
