import mongoose, { Schema } from 'mongoose';
import { OTP } from '../types';

const otpSchema = new Schema<OTP>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<OTP>('OTP', otpSchema);
