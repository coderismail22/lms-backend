import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { LessonControllers } from "./lesson.controller";
import { LessonValidations } from "./lesson.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-lesson",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(LessonValidations.createLessonValidationSchema),
  LessonControllers.createLesson,
);

router.get("/:lessonId", LessonControllers.getLesson);
router.get("/", LessonControllers.getAllLessons);

router.patch(
  "/update-lesson/:lessonId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(LessonValidations.updateLessonValidationSchema),
  LessonControllers.updateLesson,
);

router.delete(
  "/delete-lesson/:lessonId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  LessonControllers.deleteLesson,
);

export const LessonRoutes = router;
