import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import session from 'express-session';
import express from 'express';

const options = { timestamps: true, discriminatorKey: 'role' };

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  clerkId: { type: String, unique: true },
  role: { type: String, required: true, enum: ['patient', 'doctor', 'ngo'] },
}, options);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', userSchema);

// Patient Schema
const Patient = User.discriminator(
  'Patient',
  new mongoose.Schema(
    {
      phoneNumber: String,
      age: Number,
      gender: String,
      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      illness: [String],
      symptoms: [String],
      location: String,
    },
    options
  )
);

// Doctor Schema
const Doctor = User.discriminator(
  'Doctor',
  new mongoose.Schema(
    {
      licenseNumber: { type: String, unique: true },
      verified: { type: Boolean, default: false },
      patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
      specialization: [String],
      experience: String,
      verifiedBy: [String],
    },
    options
  )
);

// NGO Schema
const NGO = User.discriminator(
  'NGO',
  new mongoose.Schema(
    {
      orgName: String,
      missionStatement: String,
      verifiedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      verified: { type: Boolean, default: false },
      certifications: [String],
      address: String,
      digitalAvailability: String,
    },
    options
  )
);

// Post Schema
const Post = mongoose.model(
  'Post',
  new mongoose.Schema(
    {
      content: String,
      imageUrl: [String],
      reportUrl: [String],
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
      verified: { type: Boolean, default: false },
      medicalHistory: String,
    },
    options
  )
);

// Request Container Schema
const RequestContainer = mongoose.model(
  'RequestContainer',
  new mongoose.Schema(
    {
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      ngoRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NgoRequest' }],
    },
    options
  )
);

// NGO Request Schema
const NgoRequest = mongoose.model(
  'NgoRequest',
  new mongoose.Schema(
    {
      requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'RequestContainer' },
      orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
      orgName: String,
    },
    options
  )
);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();
app.use(express.json());
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async (req, res) => {
  try {
    const { email, password, role, ...rest } = req.body;
    let user;
    if (role === 'patient') user = new Patient({ email, role, ...rest });
    else if (role === 'doctor') user = new Doctor({ email, role, ...rest });
    else if (role === 'ngo') user = new NGO({ email, role, ...rest });
    else return res.status(400).json({ message: 'Invalid role' });

    await User.register(user, password);
    passport.authenticate('local')(req, res, () => {
      res.status(201).json({ message: 'Registration successful!' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration.' });
  }
});

app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ message: 'Authentication error.' });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    req.login(user, (loginErr) => {
      if (loginErr) return res.status(500).json({ message: 'Login failed.' });
      res.status(200).json({ message: 'Login successful!' });
    });
  })(req, res);
});

app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out.' });
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));

export { User, Patient, Doctor, NGO, Post, RequestContainer, NgoRequest };












import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();


const options = { timestamps: true, discriminatorKey: 'role' };

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  clerkId: { type: String, unique: true },
  role: { type: String, required: true, enum: ['patient', 'doctor', 'ngo'] },
}, options);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', userSchema);

// Patient Schema
const Patient = User.discriminator(
  'Patient',
  new mongoose.Schema(
    {
      phoneNumber: String,
      age: Number,
      gender: String,
      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      illness: [String],
      symptoms: [String],
      location: String,
    },
    options
  )
);

// Doctor Schema
const Doctor = User.discriminator(
  'Doctor',
  new mongoose.Schema(
    {
      licenseNumber: { type: String, unique: true },
      verified: { type: Boolean, default: false },
      patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
      specialization: [String],
      experience: String,
      verifiedBy: [String],
    },
    options
  )
);

// NGO Schema
const NGO = User.discriminator(
  'NGO',
  new mongoose.Schema(
    {
      orgName: String,
      missionStatement: String,
      verifiedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      verified: { type: Boolean, default: false },
      certifications: [String],
      address: String,
      digitalAvailability: String,
    },
    options
  )
);

// Post Schema
const Post = mongoose.model(
  'Post',
  new mongoose.Schema(
    {
      content: String,
      imageUrl: [String],
      reportUrl: [String],
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
      verified: { type: Boolean, default: false },
      medicalHistory: String,
    },
    options
  )
);

// Request Container Schema
const RequestContainer = mongoose.model(
  'RequestContainer',
  new mongoose.Schema(
    {
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      ngoRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NgoRequest' }],
    },
    options
  )
);

// NGO Request Schema
const NgoRequest = mongoose.model(
  'NgoRequest',
  new mongoose.Schema(
    {
      requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'RequestContainer' },
      orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO' },
      orgName: String,
    },
    options
  )
);


export { User, Patient, Doctor, NGO, Post, RequestContainer, NgoRequest };


// import mongoose from 'mongoose';
// import passportLocalMongoose from 'passport-local-mongoose';

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   isAccountVerified: {
//     type: Boolean,
//     default: false,
//   },
// }, { timestamps: true });

// // Use passport-local-mongoose for username/password handling
// userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;



















//app.js


import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
// import {User, Patient, Doctor, NGO, Post, RequestContainer, NgoRequest } from './models/authModel.js';
import {User, Patient, Doctor, NGO  } from './models/authModel.js';
import connectDB from './config/dbConfig.js';
// import Patient from './models/authModel.js';

const app = express();
app.use(express.json());
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async (req, res) => {
  try {
    // const { email, password, role, ...rest } = req.body;
    const { email, password, role } = req.body;

    console.log(email, password, role);

    let user;
    if (role === 'patient') user = new Patient({ email, role});
    else if (role === 'doctor') user = new Doctor({ email, role});
    else if (role === 'ngo') user = new NGO({ email, role});
    else return res.status(400).json({ message: 'Invalid role' });

    console.log("abc");

    // if (role === 'patient') user = new Patient({ email, role, ...rest });
    // else if (role === 'doctor') user = new Doctor({ email, role, ...rest });
    // else if (role === 'ngo') user = new NGO({ email, role, ...rest });
    // else return res.status(400).json({ message: 'Invalid role' });

    await User.register(user, password);
    passport.authenticate('local')(req, res, () => {
      res.status(201).json({ message: 'Registration successful!', data:user });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error during registration.', error });
  }
});

app.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ message: 'Authentication error.' });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    req.login(user, (loginErr) => {
      if (loginErr) return res.status(500).json({ message: 'Login failed.' });
      res.status(200).json({ message: 'Login successful!' });

    });
  })(req, res);
});

app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out.' });
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});


connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
//   .catch(err => console.error(err));



