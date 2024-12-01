import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentServices } from "./payment.service";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const { batchId } = req.params;
  const paymentData = { ...req.body, userId, batchId };
  // console.log("paymentData", paymentData);

  const payment = await PaymentServices.createPayment(paymentData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment record and order created successfully.",
    data: payment,
  });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const allPayments = await PaymentServices.getAllPayments();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All payments retrieved successfully.",
    data: allPayments,
  });
});

const getPaymentsForUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;

  const payments = await PaymentServices.getPaymentsForUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payments fetched successfully",
    data: payments,
  });
});

export const PaymentControllers = {
  createPayment,
  getPaymentsForUser,
  getAllPayments,
};
