const express = require('express');
const { register, login, logout, getProfile} = require('../controllers/stage_1.js')
const { changePassword, forgotPassword, updateProfile, deleteAccount } = require('../controllers/stage_2');
const { enableMFA, verifyMFA } = require('../controllers/stage_3');

const authRouter = express.Router();

                            // STAGE 1 : Easy - basic user authentication and profile management

//Register
authRouter.post('/register',register);

//Login
authRouter.post('/login',login);

//Logout
authRouter.post('/logout',logout);

//GetProfile
authRouter.get('/profile',getProfile);


                            // Stage 2 : Medium - Password and Account Management

//ChangePassword
authRouter.post('/change-password',changePassword); 

//ForgotPassword
authRouter.post('/forgot-password',forgotPassword);

//UpdateProfile
authRouter.put('/profile',updateProfile);

// DeleteAccount
authRouter.delete('/delete-account',deleteAccount);

                            // Stage 3 : Hard - Advanced Security Measures and Multi-Factor Authentication (MFA)

//EnableMFA
authRouter.post('/enable-mfa',enableMFA);   

//VerifyMFA
authRouter.post('/verify-mfa',verifyMFA);


module.exports = authRouter;





