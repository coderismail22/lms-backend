import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { LessonServices } from "./lesson.service";
import sendResponse from "../../utils/sendResponse";

// Create a new lesson
const createLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonServices.createLessonInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson created successfully",
    data: result,
  });
});

// Get a single lesson by ID
const getLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonServices.getLessonFromDB(req.params.lessonId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson retrieved successfully",
    data: result,
  });
});

// Get all lessons
const getAllLessons = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonServices.getAllLessonsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All lessons retrieved successfully",
    data: result,
  });
});

// Update a lesson
const updateLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonServices.updateLessonInDB(
    req.params.lessonId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson updated successfully",
    data: result,
  });
});

// Delete a lesson (soft delete)
const deleteLesson = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonServices.deleteLessonFromDB(req.params.lessonId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson deleted successfully",
    data: result,
  });
});

export const LessonControllers = {
  createLesson,
  getLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
};
