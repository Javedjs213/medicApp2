import express from 'express';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './src/routes/authRoutes.js';
import connectDB from './src/config/dbConfig.js'; 
import './src/config/passportConfig.js';

const app = express();

app.use(express.json());

app.use(session({
  secret: 'smartKey__Found',  
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Authentication routes
app.use('/auth', authRoutes);

connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
