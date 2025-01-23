import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();
 
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/google', authController.googleSignIn);
router.post('/update',authenticateToken, authController.updateUser);
router.get('/me', authenticateToken, authController.getMe);

export default router;