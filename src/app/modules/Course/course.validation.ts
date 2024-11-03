import { z } from "zod";

const createCourseValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    instructor: z.string(),
    subjects: z.array(z.string()).optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    instructor: z.string().optional(),
    subjects: z.array(z.string()).optional(),
  }),
});

const linkSubjectToCourseSchema = z.object({
  body: z.object({
    courseId: z.string(),
    subjectId: z.string(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  linkSubjectToCourseSchema,
};
