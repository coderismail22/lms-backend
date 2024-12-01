import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderServices } from "./order.service";

// const createOrder = catchAsync(async (req: Request, res: Response) => {

//   const userId = req?.user?.userId;
//   const { items, totalPrice, paymentMethod } = req.body;

//   const order = await OrderServices.createOrder(
//     userId,
//     items,
//     totalPrice,
//     paymentMethod,
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Order created successfully",
//     data: order,
//   });
// });

// Get all orders for a student
const getOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
console.log('user id', userId)
  const orders = await OrderServices.getOrdersForUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully",
    data: orders,
  });
});

// All orders for admin of all the students
export const getAllOrdersForAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const allOrders = await OrderServices.getAllOrdersForAdmin();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All orders fetched successfully",
      data: allOrders,
    });
  },
);

// Single order by id
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

// Approve
const approveOrderController = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  // Call the service function to approve the order
  const result = await OrderServices.approveOrder(orderId);

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order approved successfully",
    data: result,
  });
});

// Decline
const declineOrderController = catchAsync(async (req, res) => {
  const { orderId } = req.params;

  // Call the service function to decline the order
  const result = await OrderServices.declineOrder(orderId);

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order declined successfully",
    data: result,
  });
});

export const OrderControllers = {
  getOrders,
  getOrder,
  getAllOrdersForAdmin,
  approveOrderController,
  declineOrderController,
};
