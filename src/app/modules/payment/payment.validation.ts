import { z } from "zod";

export const createPaymentValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be less than 50 characters"),
    payerNumber: z
      .string()
      .regex(/^\d+$/, "Phone number must contain only digits"),
    payeeNumber: z
      .string()
      .regex(/^\d+$/, "Phone number must contain only digits"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    amount: z.number().min(1, "Amount must be greater than 0"),
    transactionId: z.string(),
    paymentDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .transform((val) => new Date(val)),
  }),
});

export const PaymentValidations = {
  createPaymentValidationSchema,
};
