import { Schema, model, Types } from "mongoose";
import { TCourse } from "./course.interface";

const CourseSchema = new Schema<TCourse>({
  name: String,
  description: String,
  instructor: { type: Types.ObjectId, ref: "User" },
  subjects: [{ type: Types.ObjectId, ref: "Subject" }],
});

export const Course = model("Course", CourseSchema);
