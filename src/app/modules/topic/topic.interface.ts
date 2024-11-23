import { Types } from "mongoose";

//Subject Type
export type TTopic = {
  name: string;
  description: string;
  // subjectId: Types.ObjectId;
  lessons: Types.ObjectId[];
  isDeleted: boolean;
};
