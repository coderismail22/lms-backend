import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";

// const CourseSchema = new Schema<TCourse>({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   instructors: [
//     { type: Schema.Types.ObjectId, ref: "Instructor", default: [] },
//   ],
// });

const CourseSchema = new Schema<TCourse>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    img: { type: String, required: true },
    language: { type: String, required: true },
    category: { type: String, required: true },
    coursePrice: { type: Number, required: true, min: 1 },
    courseLength: { type: String, required: true },
    skillLevel: { type: String, required: true },
    courseType: { type: String, required: true },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject", default: [] }],
    careerOpportunities: [{ type: String }],
    curriculum: [{ type: String }],
    jobPositions: [{ type: String }],
    softwareList: [{ type: String }],
    projectNumber: { type: Number },
    classNumber: { type: Number },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const Course = model<TCourse>("Course", CourseSchema);
