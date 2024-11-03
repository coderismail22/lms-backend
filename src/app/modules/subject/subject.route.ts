import express from "express";
import validateRequest from "../../middlewares/validateRequest";
// import { CourseValidations } from "./subject.validation";
import { SubjectControllers } from "./subject.controller";
import { SubjectValidations } from "./subject.validation";
// import { CourseFaculty } from "./subject.model";
// import { USER_ROLE } from "../user/user.constant";
// import auth from "../../middlewares/auth";

const router = express.Router();

// Create a subject
router.post(
  "/create-a-subject",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(SubjectValidations.createSubjectValidationSchema),
  SubjectControllers.createSubject,
);

// Link subject with course
router.post(
  "/link-subject-with-course",
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // validateRequest(CourseValidations.createCourseValidationSchema),
  SubjectControllers.linkSubjectToCourse,
);

// Update a course
// router.patch(
//   "/:id",
//   // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   // validateRequest(CourseValidations.updateCourseValidationSchema),
//   SubjectControllers.updateCourse,
// );

//Get all courses
// router.get(
//   "/get-all-academic-courses",
//   // auth(
//   //   USER_ROLE.superAdmin,
//   //   USER_ROLE.admin,
//   //   USER_ROLE.faculty,
//   //   USER_ROLE.student,
//   // ),
//   SubjectControllers.getAllCourses,
// );

// Single a single course
// router.get(
//   "/:id",
//   // auth(
//   //   USER_ROLE.superAdmin,
//   //   USER_ROLE.admin,
//   //   USER_ROLE.faculty,
//   //   USER_ROLE.student,
//   // ),
//   SubjectControllers.getSingleCourse,
// );

// // Delete a single course
// router.delete(
//   "/:id",
//   // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   SubjectControllers.deleteCourse,
// );

export const CourseSubjectRoutes = router;
