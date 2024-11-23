import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TeacherServices } from "./teacher.service";
import sendResponse from "../../utils/sendResponse";

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.createTeacherInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Teacher created successfully",
    data: result,
  });
});

const getTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.getTeacherFromDB(req.params.teacherId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher retrieved successfully",
    data: result,
  });
});

const getAllTeachers = catchAsync(async (_req: Request, res: Response) => {
  const result = await TeacherServices.getAllTeachersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All teachers retrieved successfully",
    data: result,
  });
});

const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.updateTeacherInDB(
    req.params.teacherId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher updated successfully",
    data: result,
  });
});

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const result = await TeacherServices.deleteTeacherFromDB(
    req.params.teacherId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teacher deleted successfully",
    data: result,
  });
});

export const TeacherControllers = {
  createTeacher,
  getTeacher,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
};
