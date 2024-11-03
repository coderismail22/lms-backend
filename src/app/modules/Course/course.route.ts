import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";
// import { USER_ROLE } from "../user/user.constant";
// import auth from "../../middlewares/auth";
const router = express.Router();

// Create a course
router.post(
  "/create-course",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);



// Update a course
router.patch(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

//Get all courses
router.get(
  "/get-all-academic-courses",
  // auth(
  //   USER_ROLE.superAdmin,
  //   USER_ROLE.admin,
  //   USER_ROLE.student,
  // ),
  CourseControllers.getAllCourses,
);

// get a single course
router.get(
  "/:id",
  // auth(
  // USER_ROLE.superAdmin,
  // USER_ROLE.admin,
  // USER_ROLE.student,
  // ),
  CourseControllers.getSingleCourse,
);

// Delete a single course
router.delete(
  "/:id",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;
