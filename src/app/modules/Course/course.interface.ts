import { Types } from "mongoose";

export type TCourse = {
  name: string;
  description: string;
  instructor: { type: Types.ObjectId };
  subjects: [{ type: Types.ObjectId }];
};
