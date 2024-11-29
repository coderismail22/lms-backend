import { Types } from "mongoose";

export type TOrder = {
  userId: Types.ObjectId;
  name: string;
  batchId: Types.ObjectId;
  courseId: Types.ObjectId;
  totalPrice: number;
  paymentId: Types.ObjectId;
  orderStatus: "Pending" | "Approved" | "Declined";
};
