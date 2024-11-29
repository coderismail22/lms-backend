import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createPaymentValidationSchema } from "./payment.validation";
import auth from "../../middlewares/auth";
import { PaymentControllers } from "./payment.controller";

const router = express.Router();

router.post(
  "/:batchId",
  auth("student"),
  validateRequest(createPaymentValidationSchema),
  PaymentControllers.createPayment,
);

router.get(
  "/",
  // auth("student"),
  PaymentControllers.getPayments,
);

export const PaymentRoutes = router;
