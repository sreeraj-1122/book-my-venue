import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import User from '../models/user.model';
import OTP from '../models/otp.model';
import { sendOTPEmail } from '../utils/email';
import { verifyGoogleToken } from '../utils/google';
import cloudinary from '../config/cloudinary';

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
        otp: otp,
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
      otp: otp,
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

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.json({
      message: 'Signed in successfully',
      token,
      user
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

    // Split name into first and last names
    const [firstName, ...lastNameParts] = payload.name?.split(' ') || [];
    const lastName = lastNameParts.join(' '); // Handle cases where the last name has multiple parts

    // Create or update user
    const user = await User.findOneAndUpdate(
      { email: payload.email },
      {
        firstName,
        lastName,
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
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(500).json({ error: 'Failed to sign in with Google' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {   
  try {     
    if (!req.user) {       
      res.status(401).json({ error: 'User not authenticated' });       
      return;     
    }       
 
    const userId = req.user._id;     
    const { firstName, lastName, phone, role } = req.body;       
 
    // Prepare update object dynamically
    const updateData: any = { 
      firstName, 
      lastName, 
      phone, 
      role 
    };
 
    // Handle profile image upload
    if (req.file) {       
      const result = await cloudinary.uploader.upload(req.file.path, {         
        folder: 'profile-images',         
        transformation: [           
          { width: 500, height: 500, crop: 'fill' },           
          { quality: 'auto' }         
        ]       
      });         
      updateData.picture = result.secure_url;     
    }       
 
    // Update the user record
    const updatedUser = await User.findByIdAndUpdate(       
      userId,       
      updateData,       
      { new: true, runValidators: true }     
    );       
 
    if (!updatedUser) {       
      res.status(404).json({ error: 'User not found' });       
      return;     
    }       
 
    res.status(200).json({       
      message: 'User updated successfully',       
      user: updatedUser     
    });   
  } catch (error) {     
    console.error('Error updating user:', error);     
    res.status(500).json({ error: 'Failed to update user' });   
  }  
 };




export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      user:req.user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
};


// : {
//   _id: req.user._id,
//   firstName: req.user.firstName,
//   lastName: req.user.lastName,
//   picture: req.user.picture,
//   phone: req.user.phone,
//   role: req.user.role,
//   verified: req.user.verified
// }