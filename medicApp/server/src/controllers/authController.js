import passport from 'passport';
// import User from '../models/authModel.js';
import { User, Patient, Doctor, NGO } from '../models/authModel.js';



export const registerUser = async (req, res) => {
    try {
      const { fullName, email, password, role } = req.body;
  
      if (!fullName || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      let user, userData;
      if (role === 'patient') {
        user = new Patient({ fullName, email, role });
        console.log("Patient user:");
        userData = await Patient.register(user, password);
        console.log("User after registration:", userData);

      } else if (role === 'doctor') {
        user = new Doctor({ fullName, email, role });
        console.log("Doctor user:");
        userData = await Doctor.register(user, password);
        console.log("User after registration:", userData);

      } else if (role === 'ngo') {
        user = new NGO({ orgName: fullName, email, role });
        console.log("NGO user:");
        userData = await NGO.register(user, password);
        console.log("User after registration:", userData);
      } else {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
  
      //code me
      // user = new Patient({ fullName, email, role })
  
      console.log("User After registration:", user);
  
    //   let test = await Patient.register(user, password);
    //   console.log("User after registration:", test);
  
      // passport.authenticate('local')(req, res, () => {
      //   res.status(201).json({ message: 'Registration successful!', data: user });
      // });
  
      req.login(user, (err) => {
        if (err) {
          console.error("Login error:", err);
          return res.status(500).json({ message: 'Login failed after registration.' });
        }
  
        return res.status(201).json({ message: 'Registration successful!', data: user });
      });
  
  
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: 'Error during registration.', error });
    }
};


// export const loginUser = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     console.log(email, password, role);

//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     let UserModel;
//     if (role === "patient") {
//       UserModel = Patient;
//     } else if (role === "doctor") {
//       UserModel = Doctor;
//     } else if (role === "ngo") {
//       UserModel = NGO;
//     } else {
//       return res.status(400).json({ message: "Invalid role provided." });
//     }

//     let data = await UserModel.findOne({ email });

//     router.post('/login', passport.authenticate('multi-role-local',async (err, user, info) => {
//               console.log("User::::", user);
//             if (err) {
//               console.error("Authentication error:", err);
//               return res.status(500).json({ message: "Authentication error." });''
//             }
      
//             if (!user) {
//               return res.status(401).json({ message: "Invalid email or password." });
//             }
      
//             req.login(user, (loginErr) => {
//               if (loginErr) {
//                 console.error("Login error:", loginErr);
//                 return res.status(500).json({ message: "Login failed." });
//               }
      
//               return res.status(200).json({ message: "Login successful!", data: user });
//             });
//           })(req, res)     
      
      
//     //   {
//     //   successRedirect: (req, res) => {
//     //     // Redirect based on role
//     //     switch(req.user.role) {
//     //       case 'doctor': return '/doctor-dashboard';
//     //       case 'patient': return '/patient-dashboard';
//     //       case 'ngo': return '/ngo-dashboard';
//     //       default: return '/';
//     //     }
//     //   },
//     //   failureRedirect: '/login',
//     //   failureFlash: true
//     // }
  
//   ));

//     console.log("done");

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Error during login.", error });
//   }
// };




// export const loginUser = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     console.log(email, password, role);

//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     let UserModel;
//     if (role === "patient") {
//       UserModel = Patient;
//     } else if (role === "doctor") {
//       UserModel = Doctor;
//     } else if (role === "ngo") {
//       UserModel = NGO;
//     } else {
//       return res.status(400).json({ message: "Invalid role provided." });
//     }

//     let data = await UserModel.findOne({ email });

//     // console.log("Login Data: ", data);

//     // req.login(data, (loginErr) => {
//     //     if (loginErr) {
//     //       console.error("Login error:", loginErr);
//     //       return res.status(500).json({ message: "Login failed." });
//     //     }

//     //     return res.status(200).json({ message: "Login successful!", data: user });
//     //   });



//     passport.authenticate("local", async (err, user, info) => {
//         console.log("User::::", user);
//       if (err) {
//         console.error("Authentication error:", err);
//         return res.status(500).json({ message: "Authentication error." });''
//       }

//       if (!user) {
//         return res.status(401).json({ message: "Invalid email or password." });
//       }

//       req.login(user, (loginErr) => {
//         if (loginErr) {
//           console.error("Login error:", loginErr);
//           return res.status(500).json({ message: "Login failed." });
//         }

//         return res.status(200).json({ message: "Login successful!", data: user });
//       });
//     })(req, res);



//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Error during login.", error });
//   }
// };



export const loginUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    console.log(email, password, role);

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let UserModel;
    if (role === "patient") {
      UserModel = Patient;
    } else if (role === "doctor") {
      UserModel = Doctor;
    } else if (role === "ngo") {
      UserModel = NGO;
    } else {
      return res.status(400).json({ message: "Invalid role provided." });
    }

    passport.authenticate("multi-role-local", (err, user, info) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ message: "Authentication error." });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      req.login(user, (loginErr) => {
        if (loginErr) {
          console.error("Login error:", loginErr);
          return res.status(500).json({ message: "Login failed." });
        }

        return res.status(200).json({ message: "Login successful!", data: user });
      });
    })(req, res, next);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginNgo = async (req, res) =>{


  
}
export const loginDoctor = async (req, res) =>{
  passport.authenticate('doctor-local', {
    successRedirect: '/doctor-dashboard',
    failureRedirect: '/login',
    failureFlash: true
  });
  console.log("Doctor login called");

  res.status(200).json({ message: "Doctor login successful!" });

}



export const loginPatient = async (req, res) =>{

}


export const logoutUser = async (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Error logging out." });
      res.status(200).json({ message: "Logged out successfully." });
    });
  };
  




