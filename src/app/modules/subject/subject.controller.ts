import { Request, Response } from "express";

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { SubjectServices } from "./subject.service";
import sendResponse from "../../utils/sendResponse";

const createSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.createSubjectIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject created successfully",
    data: result,
  });
});

const updateSubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubjectServices.updateSubjectInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject updated successfully",
    data: result,
  });
});

const linkTopicToSubject = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.linkTopicToSubject(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic linked to subject successfully",
    data: result,
  });
});

const getSubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubjectServices.getSubjectFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject retrieved successfully",
    data: result,
  });
});

const getAllSubjects = catchAsync(async (req: Request, res: Response) => {
  const result = await SubjectServices.getAllSubjectsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subjects retrieved successfully",
    data: result,
  });
});

const deleteSubject = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubjectServices.deleteSubjectFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subject deleted successfully",
    data: result,
  });
});

export const SubjectControllers = {
  createSubject,
  updateSubject,
  linkTopicToSubject,
  getSubject,
  getAllSubjects,
  deleteSubject,
};
