import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import User from '../models/user.model';
import OTP from '../models/otp.model';
import { sendOTPEmail } from '../utils/email';
import { verifyGoogleToken } from '../utils/google';
import cloudinary from '../config/cloudinary';
import e from 'cors';
import { JWTService } from '../services';

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
    const { email, otp }: { email: string; otp: string } = req.body;

    // Find OTP document in the database
    const otpDoc = await OTP.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() }, // Ensure OTP is not expired
    });

    if (!otpDoc) {
       res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid or expired OTP',
      });
      return
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // If user does not exist, return isNewUser response
       res.status(200).json({
        status: 200,
        success: true,
        message: 'Success',
        data: { email, isNewUser: true },
      });
      return
    }

    // Generate tokens for the existing user
    const accessToken = JWTService.generateAccessToken({
      id: existingUser._id.toString(),
      email: existingUser.email,
    });
    const refreshToken = JWTService.generateRefreshToken({
      id: existingUser._id.toString(),
      email: existingUser.email,
    });

    // Set refresh token in a secure cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    // Return response with user data and access token
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Onboarding pending',
      data: {
        ...existingUser.toObject(), // Convert Mongoose document to plain object
        accessToken,
      },
    });

    // Clean up OTP document
    await OTP.deleteOne({ _id: otpDoc._id });
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to verify OTP',
      error: error.message,
    });
  }
};


export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {

    // Check if the phone number already exists
    if (req.body.phone) {
      const existingPhone = await User.findOne({ phone: req.body.phone });
      if (existingPhone) {
        res.status(409).json({
          message: 'Phone number already exists',
          status: 409,
          success: false,
        });
        return;
      }
    }

    // Create the user
    const newUser: any = await User.create({
      ...req.body,
    });

    // Generate tokens
    const payload = { id: newUser._id, email: newUser.email };
    const accessToken = JWTService.generateAccessToken(payload);
    const refreshToken = JWTService.generateRefreshToken(payload);

    // Send refresh token in secure cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    // Send success response
    res.status(201).json({
      message: 'success',
      data: { ...newUser.toObject(), accessToken },
      status: 201,
      success: true,
    });
  } catch (error: any) {
    console.error('Create User Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
};


export const googleSignIn = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body);

    const { email, firstName, lastName, picture } = req.body;

    // Check if the user exists in the database
    const existingUser = await User.findOne({ email });

    // Generate JWT token
    const token = jwt.sign(
      { email }, // You can add more payload data as needed
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    if (!existingUser) {
      // If the user does not exist, respond with isNewUser flag and token
      return res.status(200).json({
        message: 'success',
        data: { email, firstName, lastName, picture, isNewUser: true, token },
        status: 200,
        success: true,
      });
    } else {
      // Respond with the existing user data and token
      return res.status(200).json({
        message: 'Google Login User',
        status: 200,
        success: true,
        data: {
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          picture: existingUser.picture,
          role:existingUser.role, 
          token,
        },
      });
    }
  } catch (error) {
    console.error('Google sign-in error:', error);
    return res.status(500).json({ error: 'Failed to sign in with Google' });
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