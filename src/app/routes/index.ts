import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { SubjectRoutes } from "../modules/subject/subject.route";
import { TopicRoutes } from "../modules/topic/topic.route";
import { LessonRoutes } from "../modules/lesson/lesson.route";
import { StudentRoutes } from "../modules/student/student.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { BatchRoutes } from "../modules/batch/batch.route";
import { TeacherRoutes } from "../modules/teacher/teacher.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { OrderRoutes } from "../modules/order/order.route";
import { SeminarRoutes } from "../modules/seminar/seminar.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/payments",
    route: PaymentRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
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
    path: "/teachers",
    route: TeacherRoutes,
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
  {
    path: "/seminar",
    route: SeminarRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
