import { z } from "zod";

export const createPaymentValidationSchema = z.object({
  body: z.object({
    orderId: z.string().min(1, "Order ID is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    amount: z.number().min(1, "Amount must be greater than 0"),
  }),
});

export const PaymentValidations = {
  createPaymentValidationSchema,
};
