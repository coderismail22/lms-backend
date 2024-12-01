import express from "express";
// import auth from "../../middlewares/auth";
import { OrderControllers } from "./order.controller";

const router = express.Router();

// router.post(
//   "/",
//   // auth("student"),
//   validateRequest(OrderValidations.createOrderValidationSchema),
//   OrderControllers.createOrder,
// );

// Get all orders for admin of all students
router.get(
  "/get-all-orders-for-admin",
  // auth("student"),
  OrderControllers.getAllOrdersForAdmin,
);

// Get all orders for students
router.get(
  "/",
  // auth("student"),
  OrderControllers.getOrders,
);

// Get one specific order for student
router.get(
  "/:orderId",
  // auth("student"),
  OrderControllers.getOrder,
);

// Approve Order Route
router.post(
  "/approve/:orderId",
  // validateRequest(OrderValidations.approveOrderValidation),
  OrderControllers.approveOrderController,
);

// Decline Order Route
router.post(
  "/decline/:orderId",
  // validateRequest(OrderValidations.declineOrderValidation),
  OrderControllers.declineOrderController,
);

export const OrderRoutes = router;
