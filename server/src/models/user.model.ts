import mongoose, { Schema } from 'mongoose';
import { User } from '../types';

const userSchema = new Schema<User>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  picture: {
    type: String,
  },
  googleId: {
    type: String,
  },
  role: {
    type: String,
    enum: ['OWNER', 'CUSTOMER'],
    required: true,
  },
 
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
  ],
});

export default mongoose.model<User>('User', userSchema);
