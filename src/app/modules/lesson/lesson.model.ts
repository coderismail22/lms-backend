import { Schema, model } from "mongoose";
import { TLesson } from "./lesson.interface";

const LessonSchema = new Schema<TLesson>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["video", "assignment", "post"],
      required: true,
    },
    isCompleted: { type: Boolean, default: false }, // track progress
    completedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Lesson = model<TLesson>("Lesson", LessonSchema);
