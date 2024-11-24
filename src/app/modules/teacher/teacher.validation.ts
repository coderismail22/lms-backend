import { z } from "zod";

const createTeacherValidationSchema = z.object({
  body: z.object({
    teacherName: z.string().min(1, "Teacher name is required"),
    email: z.string().email("Email must be valid"),
    phone: z.string().optional(),
    profileImg: z.string().optional(), //TODO: add checking if user gives profile url
    salary: z.number().optional(),
    // subject: z.string().min(1, "Subject is required"),
    // qualifications: z
    //   .array(z.string().min(1, "Qualification must not be empty"))
    //   .min(1, "At least one qualification is required"),
    // joiningDate: z
    //   .string()
    //   .refine((dateString) => !isNaN(Date.parse(dateString)), {
    //     message: "Joining date must be a valid date (e.g., YYYY-MM-DD)",
    //   }),
  }),
});

const updateTeacherValidationSchema = z.object({
  body: z.object({
    teacherName: z.string().optional(),
    profileImg: z.string().optional(), // TODO: add checking if user gives profile url
    email: z.string().email("Email must be valid").optional(),
    phone: z.string().optional(),
    salary: z.number().optional(),
    // subject: z.string().optional(),
    // qualifications: z.array(z.string().min(1)).optional(),
    // joiningDate: z
    //   .string()
    //   .optional()
    //   .refine((dateString) => !dateString || !isNaN(Date.parse(dateString)), {
    //     message: "Joining date must be a valid date (e.g., YYYY-MM-DD)",
    //   }),
  }),
});

export const TeacherValidations = {
  createTeacherValidationSchema,
  updateTeacherValidationSchema,
};
