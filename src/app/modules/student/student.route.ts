import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

router.get(
  "/get-last-completed-lesson",
  StudentControllers.getLastCompletedLesson,
);

router.put(
  "/update-student-lesson-progress",
  // validateRequest(StudentValidations.updateLessonProgressValidationSchema),
  StudentControllers.updateLessonProgress,
);

export const StudentRoutes = router;
