import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BatchControllers } from "./batch.controller";
import { BatchValidations } from "./batch.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// Create a new batch
router.post(
  "/create-batch",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(BatchValidations.createBatchValidationSchema),
  BatchControllers.createBatch,
);

// Get a specific batch by ID
router.get(
  "/:batchId",
  // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  BatchControllers.getBatch,
);

// Get all batches
router.get(
  "/",
  // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  BatchControllers.getAllBatches,
);

// Update a batch by ID
router.patch(
  "/update-batch/:batchId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(BatchValidations.updateBatchValidationSchema),
  BatchControllers.updateBatch,
);

// Delete a batch by ID
router.delete(
  "/:batchId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  BatchControllers.deleteBatch,
);

export const BatchRoutes = router;
