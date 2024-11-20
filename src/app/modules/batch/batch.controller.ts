import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BatchServices } from "./batch.service";
import sendResponse from "../../utils/sendResponse";

const createBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchServices.createBatchInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Batch created successfully",
    data: result,
  });
});

const getBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchServices.getBatchFromDB(req.params.batchId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Batch retrieved successfully",
    data: result,
  });
});

const getAllBatches = catchAsync(async (_req: Request, res: Response) => {
  const result = await BatchServices.getAllBatchesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All batches retrieved successfully",
    data: result,
  });
});

const updateBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchServices.updateBatchInDB(
    req.params.batchId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Batch updated successfully",
    data: result,
  });
});

const deleteBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await BatchServices.deleteBatchFromDB(req.params.batchId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Batch deleted successfully",
    data: result,
  });
});

export const BatchControllers = {
  createBatch,
  getBatch,
  getAllBatches,
  updateBatch,
  deleteBatch,
};
