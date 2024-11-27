import { z } from "zod";

const addToCartValidationSchema = z.object({
  body: z.object({
    batchId: z.string().min(1, "Batch ID is required"),
  }),
});

export const CartValidations = {
  addToCartValidationSchema,
};
