import { Schema, model } from "mongoose";
import { TTeacher } from "./teacher.interface";

const TeacherSchema = new Schema<TTeacher>(
  {
    teacherName: {
      type: String,
      required: [true, "Teacher name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^\S+@\S+\.\S+$/.test(value);
        },
        message: "Email must be valid",
      },
    },
    profileImg: {
      type: String,
      trim: true,
      default: "",
    },
    salary: {
      type: Number,
      trim: true,
      default: 0,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },

    // subject: {
    //   type: String,
    //   required: [true, "Subject is required"],
    //   trim: true,
    // },
    // qualifications: {
    //   type: [String],
    //   required: [true, "Qualifications are required"],
    //   validate: {
    //     validator: function (value: string[]) {
    //       return value.length > 0 && value.every((v) => v.trim().length > 0);
    //     },
    //     message: "Qualifications must not be empty",
    //   },
    // },
    // joiningDate: {
    //   type: String,
    //   required: [true, "Joining date is required"],
    //   validate: {
    //     validator: function (value: string) {
    //       return !isNaN(Date.parse(value));
    //     },
    //     message: "Joining date must be a valid date (e.g., YYYY-MM-DD)",
    //   },
    // },
  },
  { timestamps: true },
);

export const Teacher = model<TTeacher>("Teacher", TeacherSchema);
