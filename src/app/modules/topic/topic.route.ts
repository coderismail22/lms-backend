import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TopicControllers } from "./topic.controller";
import { TopicValidations } from "./topic.validation";

const router = express.Router();

router.post(
  "/create-topic",
  validateRequest(TopicValidations.createTopicValidationSchema),
  TopicControllers.createTopic,
);

router.get("/:topicId", TopicControllers.getTopic);
router.get("/", TopicControllers.getAllTopics);

router.patch(
  "/update-topic/:topicId",
  validateRequest(TopicValidations.updateTopicValidationSchema),
  TopicControllers.updateTopic,
);

router.post(
  "/link-lesson",
  validateRequest(TopicValidations.linkLessonToTopicValidationSchema),
  TopicControllers.linkLessonToTopic,
);

router.delete("/delete-topic/:topicId", TopicControllers.deleteTopic);

export const TopicRoutes = router;
