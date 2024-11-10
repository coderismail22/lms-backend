import { z } from "zod";

const createTopicValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Topic name is required"),
    description: z.string().optional(),
    subjectId: z.string().min(1, "Subject ID is required"),
  }),
});

const updateTopicValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    topicId: z.string().min(1, "Topic ID is required"),
  }),
});

const linkLessonToTopicValidationSchema = z.object({
  body: z.object({
    topicId: z.string().min(1, "Topic ID is required"),
    lessonId: z.string().min(1, "Lesson ID is required"),
  }),
});

export const TopicValidations = {
  createTopicValidationSchema,
  updateTopicValidationSchema,
  linkLessonToTopicValidationSchema,
};
