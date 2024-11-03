import { Types } from "mongoose";

//Subject Type
export type TSubject = {
  name: string;
  description: string;
  courseId: Types.ObjectId;
  isDeleted: boolean;
};
