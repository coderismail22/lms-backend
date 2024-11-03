import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";

const CourseSchema = new Schema<TCourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User" },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject", default: [] }],
});

export const Course = model<TCourse>("Course", CourseSchema);
