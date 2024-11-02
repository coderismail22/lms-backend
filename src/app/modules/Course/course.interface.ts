import { Types } from "mongoose";

export type TCourse = {
  name: string;
  description: string;
  instructor: Types.ObjectId;
  subjects: Types.ObjectId[];
};
