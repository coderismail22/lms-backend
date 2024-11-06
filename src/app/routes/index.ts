import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { SubjectRoutes } from "../modules/subject/subject.route";
import { TopicRoutes } from "../modules/topic/topic.route";
import { LessonRoutes } from "../modules/lesson/lesson.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/subjects",
    route: SubjectRoutes,
  },
  {
    path: "/topics",
    route: TopicRoutes,
  },
  {
    path: "/lessons",
    route: LessonRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
