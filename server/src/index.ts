import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

import { config } from './config';
import router from './routes';
const app = express();

app.use(
  cors({
    origin: config.clienturl, // Frontend URL
    credentials: true, // Allow cookies
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(config.API_VERSION_URL, router);


const mongoUri = config.mongoUri;

if (!mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); 
  });

app.listen(config.SERVER.PORT, () => {
  console.log(`Server running on port ${config.SERVER.PORT}`);
});
