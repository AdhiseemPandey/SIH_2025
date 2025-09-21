require('dotenv').config(); 
const express = require('express');
const cookieParser = require('cookie-parser');

// Route Imports
const authRouter = require('./src/api/routes/auth.routes');
const userRouter = require('./src/api/routes/user.routes');
const postRouter = require('./src/api/routes/post.routes');
const adminRouter = require('./src/api/routes/admin.routes');

const app = express();

// Core Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/admin', adminRouter);

module.exports = app;