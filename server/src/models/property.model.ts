import mongoose, { Schema, Document, Types } from 'mongoose';
import { Property } from '../types';


const propertySchema = new Schema<Property>({
  propertyName: { type: String, required: true, trim: true },
  description: { type: String, required: true, maxlength: 600 },
  capacity: { type: String, required: true },
  price: { type: String, required: true },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String, required: true },
  address: { type: String, required: true, maxlength: 300 },
  city: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String },
  lat: { type: String },
  lng: { type: String },
  extraInfo: { type: String, maxlength: 400 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PropertyImage' }],
  propertyTags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PropertyTags' }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

export default mongoose.model<Property>('Property', propertySchema);
