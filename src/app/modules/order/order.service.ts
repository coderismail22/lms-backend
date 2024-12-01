import mongoose from "mongoose";
import { Order } from "./order.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Batch } from "../batch/batch.model";
import { StudentServices } from "../student/student.service";
import { Student } from "../student/student.model";

// TODO: Find order, initialize course for a student and update the orderStatus to "Approved"
// If admin clicks on "Approve" button
// * Show all orders having orderStatus field as "Pending" as table
// 1. Take userId and paymentId
// 2. Check if user and payment document exist
// 3. Take name and email from user document that you got in step-2
// 4. Take batchId from payment document that got in step-2
// 5. Find out the student document from student collection by the name and email
// 6. Initialize the course for the student by the batchId (StudentServices.initializeCourseProgress(studentId,courseId))
// 7. Update the orderStatus to "Approved"

// If admin clicks on "Decline" button
// 1. Simply change the status to declined

const approveOrder = async (orderId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Find the order and ensure it's pending
    const order = await Order.findById(orderId)
      .populate("paymentId userId")
      .session(session);
    if (!order || order.orderStatus !== "Pending") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Order not found or not pending",
      );
    }

    // Step 2: Validate user and payment documents
    const user = order.userId;
    const payment = order.paymentId;
    if (!user || !payment) {
      throw new AppError(httpStatus.BAD_REQUEST, "User or Payment not found");
    }

    // Step 3: Take name and email from user document
    const { name, email } = user;

    // Step 4: Take batchId from payment document
    const { batchId } = payment;

    // Step 5: Find the student document by name and email
    const student = await Student.findOne({ name, email }).session(session);
    if (!student) {
      throw new AppError(httpStatus.NOT_FOUND, "Student not found");
    }

    // Step 6: Initialize the course for the student by the batchId
    const batch = await Batch.findById(batchId).session(session);
    if (!batch) {
      throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
    }
    await StudentServices.initializeCourseProgress({
      studentId: student._id.toString(),
      courseId: batch.courseId.toString(),
    });

    // Step 7: Update the orderStatus to "Approved"
    order.orderStatus = "Approved";
    await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    return order;
  } catch (error) {
    // Rollback in case of failure
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const declineOrder = async (orderId: string) => {
  // Step 1: Find the order and ensure it's pending
  const order = await Order.findById(orderId);
  if (!order || order.orderStatus !== "Pending") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Order not found or not pending",
    );
  }

  // Step 2: Update the orderStatus to "Declined"
  order.orderStatus = "Declined";
  await order.save();

  return order;
};

// For student specific
const getOrdersForUser = async (userId: string) => {
  const order = await Order.find({ userId })
    .populate("items.batchId")
    .populate("items.courseId");
  return order;
};

// Get all orders for admin of all the students
export const getAllOrdersForAdmin = async () => {
  const allOrders = await Order.find();
  return allOrders;
};
// Get order by id
export const getOrderById = async (orderId: string) => {
  return Order.findById(orderId)
    .populate("items.batchId")
    .populate("items.courseId");
};

export const OrderServices = {
  approveOrder,
  declineOrder,
  getAllOrdersForAdmin,
  getOrdersForUser,
  getOrderById,
};
