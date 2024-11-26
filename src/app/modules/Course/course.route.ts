import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.patch(
  "/update-course/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

// router.post(
//   "/link-subject",
//   auth(USER_ROLE.admin,USER_ROLE.superAdmin),
//   validateRequest(CourseValidations.linkSubjectToCourseSchema),
//   CourseControllers.linkSubjectToCourse,
// );

router.get("/get-single-course/:id", CourseControllers.getCourse);
router.get("/get-all-courses", CourseControllers.getAllCourses);

router.delete(
  "/delete-course/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;
