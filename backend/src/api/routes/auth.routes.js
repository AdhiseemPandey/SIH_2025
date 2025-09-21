const express = require('express');
const { register, login, logout } = require('../controllers/auth.controller');
const validateRequest = require('../../../middleware/validate.middleware');
const { userValidationSchema } = require('../models/User.model');
const router = express.Router();

router.post('/register', validateRequest(userValidationSchema), register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;