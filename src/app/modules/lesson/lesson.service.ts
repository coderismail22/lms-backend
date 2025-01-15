import httpStatus from "http-status";
import { TLesson } from "./lesson.interface";
import { Lesson } from "./lesson.model";
import AppError from "../../errors/AppError";

// Create a new lesson in the database
const createLessonInDB = async (lessonData: TLesson) => {
  const result = Lesson.create(lessonData);
  return result;
};

// Get a single lesson by ID
const getLessonFromDB = async (lessonId: string) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  return lesson;
};

// Get all lessons
const getAllLessonsFromDB = async () => {
  return Lesson.find().sort({ createdAt: -1 });
};

// Update a lesson
const updateLessonInDB = async (
  lessonId: string,
  lessonData: Partial<TLesson>,
) => {

  const lesson = await Lesson.findByIdAndUpdate(lessonId, lessonData, {
    new: true,
  });
  if (!lesson) throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  return lesson;
};

// Soft delete a lesson
const deleteLessonFromDB = async (lessonId: string) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");
  const result = lesson.deleteOne();
  return result;
};

export const LessonServices = {
  createLessonInDB,
  getLessonFromDB,
  getAllLessonsFromDB,
  updateLessonInDB,
  deleteLessonFromDB,
};
