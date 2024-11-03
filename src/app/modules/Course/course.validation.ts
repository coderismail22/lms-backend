import { z } from "zod";
const subjects = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    instructor: z.string(),
    subjects: z.array(subjects).optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    instructor: z.string().optional(),
    subjects: z.array(subjects).optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
