import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TeacherControllers } from "./teacher.controller";
import { TeacherValidations } from "./teacher.validation";

const router = express.Router();

router.post(
  "/create-teacher",
  validateRequest(TeacherValidations.createTeacherValidationSchema),
  TeacherControllers.createTeacher,
);

router.get("/:teacherId", TeacherControllers.getTeacher);

router.get("/", TeacherControllers.getAllTeachers);

router.patch(
  "/update-teacher/:teacherId",
  validateRequest(TeacherValidations.updateTeacherValidationSchema),
  TeacherControllers.updateTeacher,
);

router.delete("/:teacherId", TeacherControllers.deleteTeacher);

export const TeacherRoutes = router;
