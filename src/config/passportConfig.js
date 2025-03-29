// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import User from '../models/authModel.js';

// passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, role, done) => {
//     try {

//         console.log("passport role: ",  role);

//         const user = await User.findOne({ email });

//         if (!user) return done(null, false, { message: "User not found" });

//         // Verify password using passport-local-mongoose method
//         const isValid = await user.authenticate(password);
//         if (!isValid) return done(null, false, { message: "Invalid password" });

//         return done(null, user);
//     } catch (error) {
//         return done(error);
//     }
// }));

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error, null);
//     }
// });

// export default passport;





import passport from 'passport';
import {User} from '../models/authModel.js';


passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
