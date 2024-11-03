import { Schema, model } from "mongoose";
import { TSubject } from "./subject.interface";

const SubjectSchema = new Schema<TSubject>({
  name: { type: String, required: true },
  description: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  isDeleted: { type: Schema.Types.Boolean, default: false },
});

export const Subject = model<TSubject>("Subject", SubjectSchema);
