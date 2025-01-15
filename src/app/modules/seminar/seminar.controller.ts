import { Request, Response } from "express";
import { SeminarServices } from "./seminar.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSeminar = catchAsync(async (req: Request, res: Response) => {
  const result = await SeminarServices.createSeminarInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Seminar created successfully",
    data: result,
  });
});

const getSeminar = catchAsync(async (req: Request, res: Response) => {
  const result = await SeminarServices.getSeminarFromDB(req.params.seminarId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Seminar retrieved successfully",
    success: true,
    data: result,
  });
});

const getAllSeminars = catchAsync(async (req: Request, res: Response) => {
  const result = await SeminarServices.getAllSeminarsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seminar retrieved successfully",
    data: result,
  });
});

const updateSeminar = catchAsync(async (req: Request, res: Response) => {
  const result = await SeminarServices.updateSeminarInDB(
    req.params.seminarId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Seminar updated successfully",
    data: result,
  });
});

const deleteSeminar = catchAsync(async (req: Request, res: Response) => {
  await SeminarServices.deleteSeminarFromDB(req.params.seminarId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Semester deleted successfully.",
    success: true,
  });
});

export const SeminarControllers = {
  createSeminar,
  getSeminar,
  getAllSeminars,
  updateSeminar,
  deleteSeminar,
};
