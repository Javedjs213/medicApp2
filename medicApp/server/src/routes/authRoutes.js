import express from 'express';
import { registerUser, loginUser, logoutUser, loginDoctor, loginPatient, loginNgo } from '../controllers/authController.js';

const authRoutes = express.Router();

// Registration route
authRoutes.post('/register', registerUser);

// Login route
authRoutes.post('/login', loginUser);

// authRoutes.post('/login/patient', loginPatient);
// authRoutes.post('/login', loginNgo);
// authRoutes.post('/login/doctor', loginDoctor);

// Logout route
authRoutes.get('/logout', logoutUser);

export default authRoutes;



// Using separate strategies
// router.post('/login/doctor', passport.authenticate('doctor-local', {
//     successRedirect: '/doctor-dashboard',
//     failureRedirect: '/login',
//     failureFlash: true
//   }));
  
//   router.post('/login/patient', passport.authenticate('patient-local', {
//     successRedirect: '/patient-dashboard',
//     failureRedirect: '/login',
//     failureFlash: true
//   }));
  
  // Or using single strategy
//   router.post('/login', passport.authenticate('multi-role-local', {
//     successRedirect: (req, res) => {
//       // Redirect based on role
//       switch(req.user.role) {
//         case 'doctor': return '/doctor-dashboard';
//         case 'patient': return '/patient-dashboard';
//         case 'ngo': return '/ngo-dashboard';
//         default: return '/';
//       }
//     },
//     failureRedirect: '/login',
//     failureFlash: true
//   }));


