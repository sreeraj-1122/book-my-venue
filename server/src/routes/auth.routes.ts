import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import upload from '../middleware/upload'; // Import multer upload middleware

const authRouter = express.Router();

authRouter.post('/send-otp', authController.sendOTP);
authRouter.post('/verify-otp', authController.verifyOTP);
authRouter.post('/', authController.createUser);
authRouter.post('/google', authController.googleSignIn);
authRouter.post('/update', authenticateToken, upload.single('picture'), authController.updateUser);
authRouter.get('/me', authenticateToken, authController.getMe);

export default authRouter;