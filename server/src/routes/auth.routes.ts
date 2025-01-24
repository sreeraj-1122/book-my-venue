import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import upload from '../middleware/upload'; // Import multer upload middleware

const router = express.Router();

router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/google', authController.googleSignIn);
router.post('/update', authenticateToken, upload.single('picture'), authController.updateUser);
router.get('/me', authenticateToken, authController.getMe);

export default router;