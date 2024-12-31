import { Types } from "mongoose";

export type TCourse = {
  name: string;
  description: string;
  overview: string;
  img: string;
  language: string;
  category: string;
  coursePrice: number;
  courseLength: string;
  skillLevel: string;
  courseType: string;
  subjects: Types.ObjectId[];
  careerOpportunities: string[];
  curriculum?: string[];
  jobPositions?: string[];
  softwareList?: string[];
  projectNumber: number;
  classNumber: number;
  isDeleted: boolean;
};
