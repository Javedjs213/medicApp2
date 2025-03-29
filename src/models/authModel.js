import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Common options
const options = { timestamps: true };

// Base User Schema
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, required: true, enum: ["patient", "doctor", "ngo"] },
  },
  options
);
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);

// Patient Schema
const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phoneNumber: String,
    age: Number,
    gender: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    illness: [String],
    symptoms: [String],
    location: String,
  },
  options
);


patientSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const Patient = mongoose.model("Patient", patientSchema);

// Doctor Schema
const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    licenseNumber: { type: String, unique: true },
    verified: { type: Boolean, default: false },
    specialization: [String],
    experience: String,
  },
  options
);

doctorSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const Doctor = mongoose.model("Doctor", doctorSchema);

// NGO Schema
const ngoSchema = new mongoose.Schema(
  {
    orgName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    missionStatement: String,
    verified: { type: Boolean, default: false },
    certifications: [String],
  },
  options
);


ngoSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const NGO = mongoose.model("NGO", ngoSchema);

export { User, Patient, Doctor, NGO };
