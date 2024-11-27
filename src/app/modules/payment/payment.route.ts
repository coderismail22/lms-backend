import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createPaymentValidationSchema } from "./payment.validation";
import * as PaymentController from "./payment.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("student"),
  validateRequest(createPaymentValidationSchema),
  PaymentController.createPayment,
);

router.get("/", auth("student"), PaymentController.getPayments);

export const PaymentRoutes = router;
