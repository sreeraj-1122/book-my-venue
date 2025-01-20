import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import User from '../models/user.model';
import OTP from '../models/otp.model';
import { sendOTPEmail } from '../utils/email';
import { verifyGoogleToken } from '../utils/google';

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP expires in 10 minutes

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { email },
      { 
        code: otp,
        expiresAt,
        createdAt: new Date()
      },
      { upsert: true }
    );

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;

    // Find OTP in database
    const otpDoc = await OTP.findOne({
      email,
      code: otp,
      expiresAt: { $gt: new Date() }
    });

    if (!otpDoc) {
      res.status(400).json({ error: 'Invalid or expired OTP' });
      return;
    }

    // Create or update user
    const user = await User.findOneAndUpdate(
      { email },
      { verified: true },
      { upsert: true, new: true }
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    // Delete used OTP
    await OTP.deleteOne({ _id: otpDoc._id });

    res.json({
      message: 'Email verified successfully',
      token,
      user: {
        _id: user._id,
        email: user.email,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

export const googleSignIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { credential } = req.body;

    // Verify Google token
    const payload = await verifyGoogleToken(credential);
    
    if (!payload?.email) {
      res.status(400).json({ error: 'Invalid Google account' });
      return;
    }

    // Create or update user
    const user = await User.findOneAndUpdate(
      { email: payload.email },
      {
        name: payload.name,
        picture: payload.picture,
        googleId: payload.sub,
        verified: true
      },
      { upsert: true, new: true }
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Signed in successfully',
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(500).json({ error: 'Failed to sign in with Google' });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        verified: req.user.verified
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
};
