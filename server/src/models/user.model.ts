import mongoose, { Schema } from 'mongoose';
import { User } from '../types';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: String,
  picture: String,
  googleId: String,
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<User>('User', userSchema);
