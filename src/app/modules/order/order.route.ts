import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidations } from "./order.validation";
// import auth from "../../middlewares/auth";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/",
  // auth("student"),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get(
  "/",
  // auth("student"),
  OrderControllers.getOrders,
);
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
