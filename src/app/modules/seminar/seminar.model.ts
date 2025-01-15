import { Schema, model } from "mongoose";
import { ISeminar } from "./seminar.interface";

const SeminarSchema = new Schema<ISeminar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
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
    category: {
      type: String,
      enum: [
        "Graphics",
        "Web Development",
        "Video Editing",
        "Digital Marketing",
        "Other",
      ],
    },
    trainers: [{ type: Schema.Types.ObjectId, ref: "Trainer", required: true }],
    isUpcoming: { type: Boolean, default: true },
    location: { type: String },
    googleFormUrl: { type: String },
    googleFormEmbedUrl: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Seminar = model<ISeminar>("Seminar", SeminarSchema);
