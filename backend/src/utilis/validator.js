const validator = require('validator');
// const Joi = require('joi');

// const validate = (data) => {
//     const schema = Joi.object({
//         firstName: Joi.string().min(2).max(20).required(),
//         lastName: Joi.string().min(2).max(20).required(),
//         emailId: Joi.string().email().required(),
//         age: Joi.number().min(15).required(),
//         aadharNumber: Joi.string().length(12).required(),
//         mobileNumber: Joi.string().length(10).required()
//     });
//     return schema.validate(data);
// }
// module.exports = validate;



const Joi = require('joi');

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        emailId: Joi.string().email().required(),
        age: Joi.number().min(15).max(120).required(),
        aadharNumber: Joi.string().length(12).required(),
        mobileNumber: Joi.string().length(10).required(),
        password: Joi.string().min(8).required()   
    });
    return schema.validate(data);
};

module.exports =  validate ;





