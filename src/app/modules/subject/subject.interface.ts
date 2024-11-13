import { Types } from "mongoose";

//Subject Type
export type TSubject = {
  _id?: string;
  name: string;
  description: string;
  courseId: Types.ObjectId;
  topics: Types.ObjectId[];
  isDeleted: boolean;
};
