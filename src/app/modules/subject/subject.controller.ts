import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SubjectServices } from "./subject.service";

// Create a new subject
const createSubject = catchAsync(async (req, res) => {
  const result = await SubjectServices.createSubjectIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject is created successfully",
    data: result,
  });
});

// Create a new course
const linkSubjectToCourse = catchAsync(async (req, res) => {
  const result = await SubjectServices.linkSubjectToCourse(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject is linked to course successfully",
    data: result,
  });
});

// // Update a course
// const updateCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await SubjectServices.updateCourseIntoDB(id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Course is updated successfully",
//     data: result,
//   });
// });

// // Get all the courses
// const getAllCourses = catchAsync(async (req, res) => {
//   const result = await SubjectServices.getAllCoursesFromDB(req.query);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Retrieved all courses successfully",
//     data: result,
//   });
// });

// // Get a single course
// const getSingleCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await SubjectServices.getSingleCourseFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Retrieved single course successfully",
//     data: result,
//   });
// });

// // Delete a course
// const deleteCourse = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await SubjectServices.deleteCourseFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Course is deleted successfully",
//     data: result,
//   });
// });

export const SubjectControllers = {
  createSubject,
  linkSubjectToCourse,
  // getAllCourses,
  // getSingleCourse,
  // updateCourse,
  // deleteCourse,
};
