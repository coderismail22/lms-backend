import express from "express";
import { SeminarControllers } from "./seminar.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SeminarValidations } from "./seminar.validation";

const router = express.Router();

router.post(
  "/create-seminar",
  validateRequest(SeminarValidations.createSeminarValidationSchema),
  SeminarControllers.createSeminar,
);

router.get("/:seminarId", SeminarControllers.getSeminar);

router.get("/", SeminarControllers.getAllSeminars);

router.patch(
  "/update-seminar/:seminarId",
  validateRequest(SeminarValidations.updateSeminarValidationSchema),
  SeminarControllers.updateSeminar,
);

router.delete("/:seminarId", SeminarControllers.deleteSeminar);

export const SeminarRoutes = router;
