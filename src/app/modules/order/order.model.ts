import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        batchId: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
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
  },
  { timestamps: true },
);

export const Order = model<TOrder>("Order", OrderSchema);
