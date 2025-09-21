const express = require('express');
const { getMyProfile, updateMyProfile, changeMyPassword } = require('../controllers/user.controller');
const { isAuthenticated } = require('../../../middleware/auth.middleware');
const router = express.Router();

// This middleware protects all subsequent routes in this file
router.use(isAuthenticated);

router.get('/me', getMyProfile);
router.put('/me', updateMyProfile);
router.post('/me/change-password', changeMyPassword);

module.exports = router;