import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderServices } from "./order.service";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { items, totalPrice, paymentMethod } = req.body;

  const order = await OrderServices.createOrder(
    userId,
    items,
    totalPrice,
    paymentMethod,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order created successfully",
    data: order,
  });
});

export const getOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const orders = await OrderServices.getOrdersForUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully",
    data: orders,
  });
});

export const getOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await OrderServices.getOrderById(orderId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order fetched successfully",
    data: order,
  });
});

export const OrderControllers = {
  createOrder,
  getOrders,
  getOrder,
};
