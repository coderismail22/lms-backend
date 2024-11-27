import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CourseServices, getCourseWithBatches } from "./course.service";
import sendResponse from "../../utils/sendResponse";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

// const linkSubjectToCourse = catchAsync(async (req: Request, res: Response) => {
//   const result = await CourseServices.linkSubjectToCourse(req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Subject linked to course successfully",
//     data: result,
//   });
// });

const getCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.getCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrieved successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCoursesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses retrieved successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseInDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

export const fetchCourseWithBatches = catchAsync(
  async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const courseData = await getCourseWithBatches(courseId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Course with batches fetched successfully",
      data: courseData,
    });
  },
);

export const CourseControllers = {
  createCourse,
  updateCourse,
  // linkSubjectToCourse,
  getCourse,
  getAllCourses,
  deleteCourse,
  fetchCourseWithBatches,
};
