import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentServices } from "./payment.service";

export const createPayment = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const paymentData = { ...req.body, userId };

  const payment = await PaymentServices.createPayment(paymentData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment record created",
    data: payment,
  });
});

export const getPayments = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

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
