import { Order } from "./order.model";

export const getOrdersForUser = async (userId: string) => {
  return Order.find({ userId })
    .populate("items.batchId")
    .populate("items.courseId");
};

export const getOrderById = async (orderId: string) => {
  return Order.findById(orderId)
    .populate("items.batchId")
    .populate("items.courseId");
};

export const OrderServices = { getOrdersForUser, getOrderById };
