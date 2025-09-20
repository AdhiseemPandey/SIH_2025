const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minLength : 2,
        maxLength : 20
    },

    lastName:{
        type: String,
        required: true,
        minLength : 2,
        maxLength : 20 
    },

    emailId:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
        immutable: true
    },

    age: {
        type: Number,
        required: true,
        min: 15,
        max: 120,
        validate: {
            validator: Number.isInteger,
            message: props => `${props.value} is not a valid age!`
        }
    },

    aadharNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        immutable: true
        // ✅ Regex removed; validation happens in controller
    },

    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
        // ✅ Regex removed; validation happens in controller
    },

    password:{
        type: String,
        required: true,
        minLength: 8
    },

    role:{
        type: String,
        enum: ['user', 'admin' , 'superadmin'],
        default: 'user'
    }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;
