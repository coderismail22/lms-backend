export type TBatch = {
  batchName: string;
  courseName: string;
  couponCode?: string;
  discountPrice?: number;
  maxStudentNumber: number;
  batchImg?: string;
  trainers: string[];
  startDate: string;
  endDate: string;
  createdAt?: Date;
  updatedAt?: Date;
};
