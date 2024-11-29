import { Types } from "mongoose";

export type TPayment = {
  userId: Types.ObjectId;
  name: string;
  batchId: Types.ObjectId;
  courseId: Types.ObjectId;
  paymentMethod: "Bkash" | "Rocket" | "Nogod";
  paymentStatus: "Pending" | "Paid" | "Failed";
  transactionId?: string;
  amount: number;
  payerNumber?: string;
  payeeNumber?: string;
};
