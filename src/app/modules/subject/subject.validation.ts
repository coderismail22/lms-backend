import { z } from "zod";

const createSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    // courseId: z.string(),
    topics: z.array(z.string()).min(1, "At least one topic is required"),
  }),
});

const updateSubjectValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    topics: z.array(z.string()).optional(),
  }),
});

const linkTopicToSubjectSchema = z.object({
  body: z.object({
    subjectId: z.string(),
    topicId: z.string(),
  }),
});

export const SubjectValidations = {
  createSubjectValidationSchema,
  updateSubjectValidationSchema,
  linkTopicToSubjectSchema,
};
