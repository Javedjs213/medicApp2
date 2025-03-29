import 'dotenv/config';  

export default {
    port: process.env.PORT || 3000,
    dbURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    sessionSecretKey: process.env.SESSION_SECRET_KEY,
};
