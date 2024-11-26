import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TeacherControllers } from "./teacher.controller";
import { TeacherValidations } from "./teacher.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-teacher",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(TeacherValidations.createTeacherValidationSchema),
  TeacherControllers.createTeacher,
);

router.get("/:teacherId", TeacherControllers.getTeacher);

router.get("/", TeacherControllers.getAllTeachers);

router.patch(
  "/update-teacher/:teacherId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(TeacherValidations.updateTeacherValidationSchema),
  TeacherControllers.updateTeacher,
);

router.delete(
  "/:teacherId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  TeacherControllers.deleteTeacher,
);

export const TeacherRoutes = router;
