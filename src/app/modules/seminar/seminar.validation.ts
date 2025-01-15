import { z } from "zod";

const createSeminarValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    coverImage: z.string().url("Invalid URL for cover image"),
    startDate: z
      .string()
      .refine((dateString) => !isNaN(Date.parse(dateString)), {
        message: "Start date must be a valid date (e.g., YYYY-MM-DD)",
      }),
    category: z
      .enum([
        "Graphics",
        "Web Development",
        "Video Editing",
        "Digital Marketing",
        "Other",
      ])
      .optional(),
    trainers: z.array(z.string().min(1, "Trainer ID is required")).nonempty(),
    isUpcoming: z.boolean(),
    location: z.string().optional(),
    googleFormUrl: z.string().optional(),
    googleFormEmbedUrl: z.string().optional(),
  }),
});

const updateSeminarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().url("Invalid URL").optional(),
    startDate: z.string().optional(),
    category: z
      .enum([
        "Graphics",
        "Web Development",
        "Video Editing",
        "Digital Marketing",
        "Other",
      ])
      .optional(),
    trainers: z.array(z.string()).optional(),
    isUpcoming: z.boolean().optional(),
    location: z.string().optional(),
    googleFormUrl: z.string().optional(),
    googleFormEmbedUrl: z.string().optional(),
  }),
});

export const SeminarValidations = {
  createSeminarValidationSchema,
  updateSeminarValidationSchema,
};
