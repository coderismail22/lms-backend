import { Types } from "mongoose";

export type TPayment = {
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
  paymentMethod: string;
  paymentStatus: "Pending" | "Paid" | "Failed";
  transactionId?: string;
  amount: number;
};
