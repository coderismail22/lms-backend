import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { StudentServices } from "./student.service";

const getLastCompletedLesson = catchAsync(
  async (req: Request, res: Response) => {
    const { studentId, courseId } = req.body;
    console.log(studentId, courseId);
    const result = await StudentServices.getLastCompletedLesson(
      studentId,
      courseId,
    );

    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: "Last completed lesson retrieved successfully",
    });
  },
);

const updateLessonProgress = catchAsync(async (req: Request, res: Response) => {
  const { studentId, courseId, lessonId } = req.body;
  const result = await StudentServices.updateLessonProgress(
    studentId,
    courseId,
    lessonId,
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson progress updated successfully",
    data: result,
  });
});

export const StudentControllers = {
  getLastCompletedLesson,
  updateLessonProgress,
};
