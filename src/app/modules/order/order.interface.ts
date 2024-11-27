import { Types } from "mongoose";

export type TOrder = {
  userId: Types.ObjectId;
  items: {
    batchId: Types.ObjectId;
    courseId: Types.ObjectId;
    price: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
};
