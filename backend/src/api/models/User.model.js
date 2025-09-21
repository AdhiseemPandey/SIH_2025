const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true, minLength: 2, maxLength: 20 },
    lastName: { type: String, required: true, minLength: 2, maxLength: 20 },
    emailId: { type: String, required: true, unique: true, trim: true, lowercase: true, immutable: true },
    age: { type: Number, required: true, min: 18, max: 120 },
    aadharNumber: { type: String, required: true, unique: true, trim: true, immutable: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minLength: 8 },
    role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const userValidationSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    emailId: Joi.string().email().required(),
    age: Joi.number().min(18).max(120).required(),
    aadharNumber: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
    mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(8).required()
});

module.exports = { User, userValidationSchema };