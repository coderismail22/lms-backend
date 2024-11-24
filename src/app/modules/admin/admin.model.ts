import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";

const AdminSchema = new Schema<TAdmin>(
  {
    name: {
      type: String,
      required: [true, "Admin name is required"],
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
    phone: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true },
);

export const Admin = model<TAdmin>("Admin", AdminSchema);
