import { Types } from "mongoose";

export type TCartItem = {
  userId: Types.ObjectId;
  batchId: Types.ObjectId;
  courseId: Types.ObjectId;
  price: number;
  quantity: number;
};
