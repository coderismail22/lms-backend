import { z } from "zod";

const createOrderValidationSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        batchId: z.string().min(1, "Batch ID is required"),
        courseId: z.string().min(1, "Course ID is required"),
        price: z.number().min(1, "Price must be greater than 0"),
      }),
    ),
    totalPrice: z.number().min(1, "Total price must be greater than 0"),
    paymentMethod: z.string().min(1, "Payment method is required"),
  }),
});

const approveOrderValidation = z.object({
  params: z.object({
    orderId: z.string().length(24, "Invalid Order ID"),
  }),
});

const declineOrderValidation = z.object({
  params: z.object({
    orderId: z.string().length(24, "Invalid Order ID"),
  }),
});
export const OrderValidations = {
  createOrderValidationSchema,
  approveOrderValidation,
  declineOrderValidation,
};
