import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { LessonControllers } from "./lesson.controller";
import { LessonValidations } from "./lesson.validation";

const router = express.Router();

router.post(
  "/create-lesson",
  validateRequest(LessonValidations.createLessonValidationSchema),
  LessonControllers.createLesson,
);

router.get("/:lessonId", LessonControllers.getLesson);
router.get("/", LessonControllers.getAllLessons);

router.patch(
  "/update-lesson/:lessonId",
  validateRequest(LessonValidations.updateLessonValidationSchema),
  LessonControllers.updateLesson,
);

router.delete("/delete-lesson/:lessonId", LessonControllers.deleteLesson);

export default router;
