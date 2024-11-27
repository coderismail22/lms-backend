import { z } from "zod";

const createBatchValidationSchema = z.object({
  body: z
    .object({
      batchName: z.string().min(1, "Batch name is required"),
      courseName: z.string().min(1, "Course name is required"),
      courseId: z.string({ required_error: "Course id is required." }),
      couponCode: z.string().optional(), // Optional field
      discountPrice: z.coerce.number().optional(), // Automatically coerces to number
      maxStudentNumber: z.coerce
        .number()
        .min(1, "Max student number must be greater than 0"), // Minimum value validation
      batchImg: z.string().url("Image must be a valid URL").optional(), // Optional field with URL validation
      trainers: z
        .array(z.string().min(1, "Trainer name must not be empty"))
        .min(1, "At least one trainer is required"), // Array validation for trainers
      startDate: z
        .string()
        .refine((dateString) => !isNaN(Date.parse(dateString)), {
          message: "Start date must be a valid date (e.g., YYYY-MM-DD)",
        }),
      endDate: z
        .string()
        .refine((dateString) => !isNaN(Date.parse(dateString)), {
          message: "End date must be a valid date (e.g., YYYY-MM-DD)",
        }),
    })
    .refine((data) => Date.parse(data.startDate) < Date.parse(data.endDate), {
      message: "Start date must be earlier than end date",
      path: ["startDate"], // Assign error to the startDate field
    }),
});

const updateBatchValidationSchema = z.object({
  body: z
    .object({
      batchName: z.string().optional(),
      courseName: z.string().optional(),
      courseId: z.string().optional(),
      isActive: z.boolean().optional(),
      couponCode: z.string().optional(),
      discountPrice: z.coerce.number().optional(),
      maxStudentNumber: z.coerce.number().optional(),
      batchImg: z.string().url("Image must be a valid URL").optional(),
      trainers: z.array(z.string().min(1)).optional(),
      startDate: z
        .string()
        .optional()
        .refine((dateString) => !dateString || !isNaN(Date.parse(dateString)), {
          message: "Start date must be a valid date (e.g., YYYY-MM-DD)",
        }),
      endDate: z
        .string()
        .optional()
        .refine((dateString) => !dateString || !isNaN(Date.parse(dateString)), {
          message: "End date must be a valid date (e.g., YYYY-MM-DD)",
        }),
    })
    .refine(
      (data) => {
        if (
          typeof data.startDate === "string" &&
          typeof data.endDate === "string"
        ) {
          return Date.parse(data.startDate) < Date.parse(data.endDate);
        }
        return true; // Skip validation if one of the dates is missing
      },
      {
        message: "Start date must be earlier than end date",
        path: ["startDate"], // Assign error to the startDate field
      },
    ),
});

export const BatchValidations = {
  createBatchValidationSchema,
  updateBatchValidationSchema,
};
