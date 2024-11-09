import { Schema, model } from "mongoose";
import { TLesson } from "./lesson.interface";

const LessonSchema = new Schema<TLesson>({
  name: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ["video", "assignment", "post"], required: true },
  topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  isCompleted: { type: Boolean, default: false }, // track progress
  completedAt: { type: Date, default: null },
  isDeleted: { type: Boolean, default: false },
});

export const Lesson = model<TLesson>("Lesson", LessonSchema);
