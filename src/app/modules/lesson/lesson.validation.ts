import { z } from "zod";

const createLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Lesson name is required"),
    description: z.string().optional(),
    content: z.string(),
    isCompleted: z.boolean().optional(),
    completedAt: z.date().optional(),
    materials: z.array(
      z.object({
        name: z.string(),
        link: z.string(),
      }),
    ),
  }),
});

const updateLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    content: z.string(),
    materials: z
      .array(
        z.object({
          name: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
  }),
});

export const LessonValidations = {
  createLessonValidationSchema,
  updateLessonValidationSchema,
};
