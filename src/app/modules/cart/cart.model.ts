import { Schema, model } from "mongoose";
import { TCartItem } from "./cart.interface";

const CartSchema = new Schema<TCartItem>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true },
);

export const Cart = model<TCartItem>("Cart", CartSchema);
