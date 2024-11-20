import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { SubjectRoutes } from "../modules/subject/subject.route";
import { TopicRoutes } from "../modules/topic/topic.route";
import { LessonRoutes } from "../modules/lesson/lesson.route";
import { StudentRoutes } from "../modules/student/student.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { BatchRoutes } from "../modules/batch/batch.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/batches",
    route: BatchRoutes,
  },
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
  {
    path: "/students",
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
