import { Types } from "mongoose";

//Subject Type
export type TSubject = {
  name: string;
  description: string;
  instructor: { type: Types.ObjectId; ref: "User" };
  subjects: [{ type: Types.ObjectId; ref: "Subject" }];
};
