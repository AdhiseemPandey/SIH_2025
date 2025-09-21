const express = require('express');
const { verifyPost, deleteAnyPost, manageAdmin } = require('../controllers/admin.controller');
const { isAuthenticated } = require('../../../middleware/auth.middleware');
const { isAdmin, isSuperadmin } = require('../../../middleware/role.middleware');
const router = express.Router();

// All admin routes require the user to be logged in
router.use(isAuthenticated);

// Admin & Superadmin can verify posts
router.put('/posts/verify/:id', isAdmin, verifyPost);

// Only Superadmins can manage other users' roles or delete any post
router.put('/users/manage-role', isSuperadmin, manageAdmin);
router.delete('/posts/:id', isSuperadmin, deleteAnyPost);

module.exports = router;