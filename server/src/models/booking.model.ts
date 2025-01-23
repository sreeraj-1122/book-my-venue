import mongoose, { Schema } from "mongoose";
import { Booking } from "../types";

const bookingSchema = new Schema<Booking>({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  bookingStatus: {
    type: String,
    enum: [
      "PENDING",
      "AWAITING_OWNER_APPROVAL",
      "FAILED",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED",
    ],
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  bookingDate: { type: Date, default: Date.now },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  bookingPayments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BookingPayments" },
  ],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export default mongoose.model<Booking>("Booking", bookingSchema);
