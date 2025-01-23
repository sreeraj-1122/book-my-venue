import { Request } from 'express';
import { Types } from 'mongoose';

export enum UserRole {
  OWNER = 'OWNER',
  CUSTOMER = 'CUSTOMER',
}
export enum BookingStatus {
  PENDING = 'PENDING',
  AWAITING_OWNER_APPROVAL = 'AWAITING_OWNER_APPROVAL',
  FAILED = 'FAILED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email: string;
  picture?: string;
  googleId?: string;
  role?: UserRole;
  verified: boolean;
  createdAt: Date;
  properties: Types.ObjectId[]; // Reference to Property model
  bookings: Types.ObjectId[];  // Reference to Booking model
  payments: Types.ObjectId[];  // Reference to Payment model
}

// OTP interface
export interface OTP {
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}
export interface Payment {
  id: string;
  amount: number; // Using `number` for decimal values in TypeScript
  createdAt: Date;
  updatedAt: Date;
  status: PaymentStatus;
  transactionId: string;
  bookingId: Types.ObjectId; // Reference to Booking
  userId: Types.ObjectId; // Reference to User
  bookingPayment: BookingPayments[];
}

export interface  BookingPayments {
  id: string;
  bookingId: Types.ObjectId; // Reference to Booking
  paymentId: Types.ObjectId; // Reference to Payment
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  bookingStatus: BookingStatus;
  userId: Types.ObjectId; // Reference to User
  propertyId: Types.ObjectId; // Reference to Property
  bookingDate: Date;
  payments: Payment[]; // Array of Payment references
  bookingPayments: BookingPayments[]; // Array of BookingPayments references
  reviews: Review[]; // Array of Review references
}
export interface Property  {
  propertyName: string;
  description: string;
  capacity: string;
  price: string;
  checkInTime: string;
  checkOutTime: string;
  address: string;
  city: string;
  country: string;
  pincode?: string;
  lat?: string;
  lng?: string;
  extraInfo?: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  ownerId: Types.ObjectId; 
  propertyImages: Types.ObjectId[]; // Array of PropertyImage references
  propertyTags: Types.ObjectId[]; // Array of PropertyTags references
  bookings: Types.ObjectId[]; // Array of Booking references
  amenities: Types.ObjectId[]; // Array of Amenity references
  reviews: Types.ObjectId[]; // Array of Review references
}

export interface Review {
  id: string;
  rating: number;
  review: string;
  avatar?: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  propertyId: Types.ObjectId; // Reference to Property
  bookingId: Types.ObjectId; // Reference to Booking
}

// Extend Express.Request with the user object
declare global {
  namespace Express {
    interface Request {
      user?: User; // Optional user object added to the request
    }
  }
}
