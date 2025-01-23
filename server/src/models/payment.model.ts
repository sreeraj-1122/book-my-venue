import mongoose, { Schema } from "mongoose";
import { Payment } from "../types";

const paymentSchema = new Schema<Payment>({
  amount: { type: Number, default: 0, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
    required: true,
  },
  transactionId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingPayment: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BookingPayments" },
  ],
});

export default mongoose.model<Payment>("Payment", paymentSchema);
