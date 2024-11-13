import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(StudentValidations.createStudentValidationSchema),
  StudentControllers.createStudent,
);

router.post(
  "/initialize-course-progress",
  validateRequest(StudentValidations.initializeCourseProgressValidationSchema),
  StudentControllers.initializeCourseProgress,
);

router.get("/:studentId/courses", StudentControllers.getStudentCourses);

router.get(
  "/:studentId/courses/:courseId",
  StudentControllers.getStudentCourseDetails,
);

router.post(
  "/get-last-completed-lesson",
  StudentControllers.getLastCompletedLesson,
);

router.patch(
  "/update-student-lesson-progress",
  validateRequest(StudentValidations.updateLessonProgressValidationSchema),
  StudentControllers.updateLessonProgress,
);

export const StudentRoutes = router;
