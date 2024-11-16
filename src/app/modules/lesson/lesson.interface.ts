import { Types } from "mongoose";

export type TLesson = {
  name: string;
  content: string;
  type: "video" | "assignment" | "quiz" | "post";
  topicId: Types.ObjectId;
  isCompleted: boolean;
  completedAt: Date;
  isDeleted: boolean;
};
