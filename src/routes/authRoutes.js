import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const authRoutes = express.Router();

// Registration route
authRoutes.post('/register', registerUser);

// Login route
authRoutes.post('/login', loginUser);

// Logout route
authRoutes.get('/logout', logoutUser);

export default authRoutes;
