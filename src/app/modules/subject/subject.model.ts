import { Schema, model } from "mongoose";
import { TSubject } from "./subject.interface";

const SubjectSchema = new Schema<TSubject>({
  name: { type: String, required: true },
  description: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
});

export const Subject = model<TSubject>("Subject", SubjectSchema);
