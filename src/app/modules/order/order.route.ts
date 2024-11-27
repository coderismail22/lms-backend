import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createOrderValidationSchema } from "./order.validation";
// import auth from "../../middlewares/auth";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/",
  // auth("student"),
  validateRequest(createOrderValidationSchema),
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

export const OrderRoutes = router;
