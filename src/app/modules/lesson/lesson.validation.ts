import { z } from "zod";

const createLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Lesson name is required"),
    content: z.string().optional(),
    topicId: z.string().min(1, "Topic ID is required"),
  }),
});

const updateLessonValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    content: z.string().optional(),
  }),
  params: z.object({
    lessonId: z.string().min(1, "Lesson ID is required"),
  }),
});

export const LessonValidations = {
  createLessonValidationSchema,
  updateLessonValidationSchema,
};
