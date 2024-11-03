import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { CourseSubjectRoutes } from "../modules/subject/subject.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/subjects",
    route: CourseSubjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
