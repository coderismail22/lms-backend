import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

const PaymentSchema = new Schema<TPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    paymentMethod: {
      type: String,
      enum: ["Stripe", "PayPal", "Manual"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    transactionId: { type: String },
    amount: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Payment = model<TPayment>("Payment", PaymentSchema);
