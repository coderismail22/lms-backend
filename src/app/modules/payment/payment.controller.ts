import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentServices } from "./payment.service";

export const createPayment = catchAsync(async (req: Request, res: Response) => {
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

export const getPayments = catchAsync(async (req: Request, res: Response) => {
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
  getPayments,
};
