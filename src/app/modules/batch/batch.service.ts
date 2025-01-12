import httpStatus from "http-status";
import { TBatch } from "./batch.interface";
import { Batch } from "./batch.model";
import AppError from "../../errors/AppError";

const createBatchInDB = async (batchData: TBatch) => {
  const result = await Batch.create(batchData);
  return result;
};

const getBatchFromDB = async (batchId: string) => {
  const batch = await Batch.findById(batchId)
    .populate({
      path: "enrolledStudents", // Path for the students field
      model: "Student", // Associated model
    })
    .populate({
      path: "trainers", // Path for the trainers field
      model: "Teacher", // Associated model
    });
  if (!batch) throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  return batch;
};

const getAllBatchesFromDB = async () => {
  const result = await Batch.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "courseId",
      model: "Course",
      populate: {
        path: "subjects",
        model: "Subject",
        populate: {
          path: "topics",
          model: "Topic",
          populate: {
            path: "lessons",
            model: "Lesson",
          },
        },
      },
    })
    .populate({
      path: "trainers",
      model: "Teacher",
    });
  return result;
};

const updateBatchInDB = async (batchId: string, batchData: Partial<TBatch>) => {
  const batch = await Batch.findByIdAndUpdate(batchId, batchData, {
    new: true,
    runValidators: true, // Ensure schema validators are applied during update
  });
  if (!batch) throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  return batch;
};

const deleteBatchFromDB = async (batchId: string) => {
  const batch = await Batch.findById(batchId);
  if (!batch) {
    throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  }
  const result = await batch.deleteOne();
  return result;
};

export const BatchServices = {
  createBatchInDB,
  getBatchFromDB,
  getAllBatchesFromDB,
  updateBatchInDB,
  deleteBatchFromDB,
};
