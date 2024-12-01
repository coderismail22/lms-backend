import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Order } from "../order/order.model";
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import mongoose from "mongoose";

const createPayment = async (paymentData: TPayment) => {
  // TODO: Make paymentStatus dynamic (e.g., "Paid", "Failed") based on gateway response
  const paymentStatus = "Paid"; // Default to "Paid" for now

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Handle only successful payments
    if (paymentStatus === "Paid") {
      // Create the payment record
      const payment = await Payment.create(
        [{ ...paymentData, paymentStatus }],
        { session },
      );

      if (!payment || payment.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create payment");
      }

      // Create the order record associated with the payment
      const order = await Order.create(
        [
          {
            userId: payment[0].userId,
            paymentId: payment[0]._id,
          },
        ],
        { session },
      );

      if (!order || order.length === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create order");
      }
      // Commit the transaction
      await session.commitTransaction();
      return payment[0];
    } else if (paymentStatus === "Failed") {
      // Handle failed payment case
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Payment status indicates failure. No order created.",
      );
    } else {
      // Handle unexpected payment statuses
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Unexpected payment status: ${paymentStatus}`,
      );
    }
  } catch (error) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    console.error("Transaction failed:", error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Transaction failed");
  } finally {
    // End the session
    session.endSession();
  }
};

const getAllPayments = async () => {
  const allPayments = await Payment.find();
  return allPayments;
};
export const getPaymentsForUser = async (userId: string) => {
  return Payment.find({ userId });
};

export const PaymentServices = {
  createPayment,
  getPaymentsForUser,
  getAllPayments,
};
