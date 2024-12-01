import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createPaymentValidationSchema } from "./payment.validation";
import auth from "../../middlewares/auth";
import { PaymentControllers } from "./payment.controller";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/:batchId",
  auth("student"),
  validateRequest(createPaymentValidationSchema),
  PaymentControllers.createPayment,
);

router.get(
  "/get-all-payments",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  PaymentControllers.getAllPayments,
);

router.get(
  "/",
  // auth("student"),
  PaymentControllers.getPaymentsForUser,
);

export const PaymentRoutes = router;
