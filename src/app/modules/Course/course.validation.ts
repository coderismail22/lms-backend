import { z } from "zod";

export const createCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    img: z.string(),
    language: z.string().min(1, "Language is required"),
    category: z.string().min(1, "Category is required"),
    coursePrice: z.coerce.number().min(1, "Price must be greater than 0"),
    courseLength: z.string().min(1, "Course length is required"),
    skillLevel: z.string().min(1, "Skill level is required"),
    courseType: z.string().min(1, "Course type is required"),
    subjects: z.array(z.string()),
    careerOpportunities: z.array(z.string()).optional(),
    curriculum: z.array(z.string()).optional(),
    jobPositions: z.array(z.string()).optional(),
    softwareList: z.array(z.string()).optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    img: z.string().optional(),
    language: z.string().min(1, "Language is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
    coursePrice: z.coerce
      .number()
      .min(1, "Price must be greater than 0")
      .optional(),
    courseLength: z.string().min(1, "Course length is required").optional(),
    skillLevel: z.string().min(1, "Skill level is required").optional(),
    courseType: z.string().min(1, "Course type is required").optional(),
    subjects: z.array(z.string()).optional(),
    careerOpportunities: z.array(z.string()).optional(),
    curriculum: z.array(z.string()).optional(),
    jobPositions: z.array(z.string()).optional(),
    softwareList: z.array(z.string()).optional(),
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
