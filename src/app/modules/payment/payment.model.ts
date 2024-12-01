import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

const PaymentSchema = new Schema<TPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
    name: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["bkash", "rocket", "nogod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Failed"],
      default: "Pending",
    },
    transactionId: { type: String },
    amount: { type: Number, required: true },
    payerNumber: { type: String },
    payeeNumber: { type: String, default: "01730481212" },
  },
  { timestamps: true },
);

export const Payment = model<TPayment>("Payment", PaymentSchema);
