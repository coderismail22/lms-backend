import { z } from "zod";

const createLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Lesson name is required"),
    description: z.string().optional(),
    content: z.string(),
    isCompleted: z.boolean().optional(),
    completedAt: z.date().optional(),
  }),
});

const updateLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    content: z.string(),
  }),
});

export const LessonValidations = {
  createLessonValidationSchema,
  updateLessonValidationSchema,
};
