import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Order } from "../order/order.model";
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";
import mongoose from "mongoose";

export const createPayment = async (paymentData: TPayment) => {
  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Create the payment
    const payment = await Payment.create([paymentData], { session });
    if (!payment || payment.length === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create payment");
    }

    // Create the order
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
    session.endSession();

    return payment[0];
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();

    // Log and rethrow the error
    console.error("Transaction failed: ", error);
    throw error;
  }
};

export const getPaymentsForUser = async (userId: string) => {
  return Payment.find({ userId });
};

export const PaymentServices = {
  createPayment,
  getPaymentsForUser,
};
