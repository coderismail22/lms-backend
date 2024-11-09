import { z } from "zod";

const updateLessonProgressValidationSchema = z.object({
  params: z.object({
    studentId: z.string({ required_error: "Student ID is required" }),
    courseId: z.string({ required_error: "Course ID is required" }),
    lessonId: z.string({ required_error: "Lesson ID is required" }),
  }),
});

export const StudentValidations = {
  updateLessonProgressValidationSchema,
};
