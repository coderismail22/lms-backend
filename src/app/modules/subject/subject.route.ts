import express from "express";
import SubjectControllers from "../controllers/subject.controller";
import { SubjectValidations } from "../validations/subject.validation";
import validateRequest from "../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-subject",
  validateRequest(SubjectValidations.createSubjectValidationSchema),
  SubjectControllers.createSubject
);

router.put(
  "/update-subject/:id",
  validateRequest(SubjectValidations.updateSubjectValidationSchema),
  SubjectControllers.updateSubject
);

router.post(
  "/link-topic",
  validateRequest(SubjectValidations.linkTopicToSubjectSchema),
  SubjectControllers.linkTopicToSubject
);

router.get("/get-subject/:id", SubjectControllers.getSubject);
router.get("/get-all-subjects", SubjectControllers.getAllSubjects);

router.delete("/delete-subject/:id", SubjectControllers.deleteSubject);

export default router;
