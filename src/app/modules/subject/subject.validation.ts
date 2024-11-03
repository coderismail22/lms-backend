import { z } from "zod";

// const preRequisiteCourse = z.object({
//   course: z.string(),
//   isDeleted: z.boolean().optional(),
// });

// const updatePreRequisiteCourse = z.object({
//   course: z.string(),
//   isDeleted: z.boolean().optional(),
// });

const createSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    courseId: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

// const updateSubjectValidationSchema = z.object({
//   body: z.object({
//     title: z.string().optional(),
//     prefix: z.string().optional(),
//     code: z.number().optional(),
//     credits: z.number().optional(),
//     isDeleted: z.boolean().optional(),
//   }),
// });

export const SubjectValidations = {
  createSubjectValidationSchema,
  // updateSubjectValidationSchema,
};
