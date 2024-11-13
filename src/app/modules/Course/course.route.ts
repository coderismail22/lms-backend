import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.put(
  "/update-course/:id",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.post(
  "/link-subject",
  validateRequest(CourseValidations.linkSubjectToCourseSchema),
  CourseControllers.linkSubjectToCourse,
);

router.get("/get-single-course/:id", CourseControllers.getCourse);
router.get("/get-all-courses", CourseControllers.getAllCourses);

router.delete("/delete-course/:id", CourseControllers.deleteCourse);

export const CourseRoutes = router;
