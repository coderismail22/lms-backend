import { Order } from "./order.model";
import { Cart } from "../cart/cart.model";

export const createOrder = async (
  userId: string,
  items: any[],
  totalPrice: number,
  paymentMethod: string,
) => {
  const order = await Order.create({
    userId,
    items,
    totalPrice,
    paymentMethod,
    paymentStatus: "Paid", // Assuming payment is successful
  });

  // Clear the user's cart after successful order creation
  await Cart.deleteMany({ userId });

  return order;
};

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

export const OrderServices = { createOrder, getOrdersForUser, getOrderById };
