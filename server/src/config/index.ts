import dotenv from 'dotenv';
dotenv.config();

export const config = {
  API_VERSION_URL: '/api/v1',

  SERVER: {
		PORT: process.env.PORT || 5000,
		// ORIGINS: process.env.ORIGINS.split(','),
	},

  TOKEN: {
		ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
		REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
	},

  RAZORPAY: {
		KEY_ID: process.env.RAZORPAY_KEY_ID,
		KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
	},
  EMAIL: {
		EMAIL_HOST: process.env.EMAIL_HOST,
		EMAIL_PORT: process.env.EMAIL_PORT,
		EMAIL_USERNAME: process.env.EMAIL_USER,
		EMAIL_PASSWORD: process.env.EMAIL_PASS,
		FROM_EMAIL: process.env.SENDER_EMAIL,
	},

  clienturl:process.env.CLIENT_URL,
  mongoUri: process.env.MONGO_URI ,
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  
};
