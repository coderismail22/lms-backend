// student.model.js

import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
});

const topicProgressSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  lessons: [lessonProgressSchema], // Array of lesson progress within this topic
});

const subjectProgressSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  topics: [topicProgressSchema], // Array of topic progress within this subject
});

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  subjects: [subjectProgressSchema], // Array of subject progress within this course
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  courses: [courseProgressSchema], // Array of course progress
});

export const student = mongoose.model("Student", studentSchema);
