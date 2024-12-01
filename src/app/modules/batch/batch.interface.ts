import { Types } from "mongoose";

export type TBatch = {
  batchName: string;
  courseName: string;
  courseId: Types.ObjectId;
  couponCode?: string;
  discountPrice?: number;
  maxStudentNumber: number;
  batchImg?: string;
  trainers: string[];
  startDate: string;
  endDate: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  enrolledStudents: Types.ObjectId;
};
