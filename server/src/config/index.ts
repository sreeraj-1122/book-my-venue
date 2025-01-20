import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI ,
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    sender: process.env.SENDER_EMAIL,

  }
};
