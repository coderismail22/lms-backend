import { Schema, model } from "mongoose";
import { TBatch } from "./batch.interface";

const BatchSchema = new Schema<TBatch>(
  {
    batchName: {
      type: String,
      required: [true, "Batch name is required"],
      trim: true,
    },
    courseName: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course id is required"],
      trim: true,
    },
    couponCode: {
      type: String,
      trim: true,
      default: null, // Optional field
    },
    discountPrice: {
      type: Number,
      default: 0, // Optional field
    },
    maxStudentNumber: {
      type: Number,
      required: [true, "Max student number is required"],
      min: [1, "Max student number must be greater than 0"],
    },
    batchImg: {
      type: String,
      // validate: {
      //   validator: function (value: string) {
      //     return /^(https?:\/\/.+)/.test(value); // Basic URL validation
      //   },
      //   message: "Image must be a valid URL",
      // },
      default: "", // Optional field
    },
    trainers: {
      type: [Schema.Types.ObjectId],
      required: [true, "At least one trainer is required"],
      validate: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: function (value: any[]) {
          return (
            value.length > 0 && value.every((v) => v.toString().length > 0)
          );
        },
        message: "Trainer names must not be empty",
      },
    },
    startDate: {
      type: String,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value: string) {
          return !isNaN(Date.parse(value)); // Validate ISO date format
        },
        message: "Start date must be a valid date (e.g., YYYY-MM-DD)",
      },
    },
    endDate: {
      type: String,
      required: [true, "End date is required"],
      validate: {
        validator: function (value: string) {
          return !isNaN(Date.parse(value)); // Validate ISO date format
        },
        message: "End date must be a valid date (e.g., YYYY-MM-DD)",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    enrolledStudents: {
      type: [{ type: Schema.Types.ObjectId, ref: "Student" }],
      default: [],
    },
  },
  { timestamps: true },
);

// Add custom validation for startDate < endDate
BatchSchema.pre("validate", function (next) {
  const batch = this as TBatch;
  if (new Date(batch.startDate) >= new Date(batch.endDate)) {
    return next(new Error("Start date must be earlier than end date"));
  }
  next();
});

// Create and export the Mongoose model
export const Batch = model<TBatch>("Batch", BatchSchema);
