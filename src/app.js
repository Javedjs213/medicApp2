import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser"; 

import passport from "passport";
import dotenv from "dotenv";
import { User, Patient, Doctor, NGO } from "./models/authModel.js";  //d
import connectDB from "./config/dbConfig.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();


app.use(bodyParser.json()); // ⬅ Parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.json());
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Routes

app.use("/api/auth",authRoutes);





// **Register Route**
// app.post("/register", async (req, res) => {
//   try {
//     // const { fullName, email, password, role, phoneNumber, age, gender, licenseNumber, orgName } = req.body;
//     const {email, password, role } = req.body;

//     console.log(email, password, role);

  
//     let user;
//     if (role === "patient") {
//       user = new Patient({ email, role});
//     } else if (role === "doctor") {
//       user = new Doctor({ email, role });
//     } else if (role === "ngo") {
//       user = new NGO({ email, role });
//     } else {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     console.log(user);

//     await User.register(user, password);
//     passport.authenticate("local")(req, res, () => {
//       res.status(201).json({ message: "Registration successful!", data: user });
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error during registration.", error });
//   }
// });


// app.post('/register', async (req, res) => {
//   try {
//     const { fullName, email, password, role } = req.body;

//     if (!fullName || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     let user;
//     if (role === 'patient') {
//       user = new Patient({ fullName, email, role });
//       console.log("Patient user:");
//     } else if (role === 'doctor') {
//       user = new Doctor({ fullName, email, role });
//       console.log("Doctor user:");
//     } else if (role === 'ngo') {
//       user = new NGO({ fullName, email, role });
//       console.log("NGO user:");
//     } else {
//       return res.status(400).json({ message: 'Invalid role' });
//     }


//     //code me
//     // user = new Patient({ fullName, email, role })

//     console.log("User before registration:", user);

//     let test = await Patient.register(user, password);
//     console.log("User after registration:", test);

//     // passport.authenticate('local')(req, res, () => {
//     //   res.status(201).json({ message: 'Registration successful!', data: user });
//     // });

//     req.login(user, (err) => {
//       if (err) {
//         console.error("Login error:", err);
//         return res.status(500).json({ message: 'Login failed after registration.' });
//       }

//       return res.status(201).json({ message: 'Registration successful!', data: user });
//     });


//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: 'Error during registration.', error });
//   }
// });



// **Login Route**
// app.post("/login", (req, res) => {
//   passport.authenticate("local", (err, user) => {
//     if (err) return res.status(500).json({ message: "Authentication error." });
//     if (!user) return res.status(401).json({ message: "Invalid email or password." });

//     req.login(user, (loginErr) => {
//       if (loginErr) return res.status(500).json({ message: "Login failed." });
//       res.status(200).json({ message: "Login successful!", user });
//     });
//   })(req, res);
// });

// **Logout Route**
// app.post("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) return res.status(500).json({ message: "Error logging out." });
//     res.status(200).json({ message: "Logged out successfully." });
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
