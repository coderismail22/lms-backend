import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SubjectValidations } from "./subject.validation";
import { SubjectControllers } from "./subject.controller";

const router = express.Router();

router.post(
  "/create-subject",
  validateRequest(SubjectValidations.createSubjectValidationSchema),
  SubjectControllers.createSubject,
);

router.patch(
  "/update-subject/:id",
  validateRequest(SubjectValidations.updateSubjectValidationSchema),
  SubjectControllers.updateSubject,
);

router.post(
  "/link-topic",
  validateRequest(SubjectValidations.linkTopicToSubjectSchema),
  SubjectControllers.linkTopicToSubject,
);

router.get("/get-subject/:id", SubjectControllers.getSubject);
router.get("/get-all-subjects", SubjectControllers.getAllSubjects);

router.delete("/delete-subject/:id", SubjectControllers.deleteSubject);

export const SubjectRoutes = router;
