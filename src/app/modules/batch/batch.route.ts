import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BatchControllers } from "./batch.controller";
import { BatchValidations } from "./batch.validation";

const router = express.Router();

// Create a new batch
router.post(
  "/create-batch",
  validateRequest(BatchValidations.createBatchValidationSchema),
  BatchControllers.createBatch,
);

// Get a specific batch by ID
router.get("/:batchId", BatchControllers.getBatch);

// Get all batches
router.get("/", BatchControllers.getAllBatches);

// Update a batch by ID
router.patch(
  "/update-batch/:batchId",
  validateRequest(BatchValidations.updateBatchValidationSchema),
  BatchControllers.updateBatch,
);

// Delete a batch by ID
router.delete("/:batchId", BatchControllers.deleteBatch);

export const BatchRoutes = router;
