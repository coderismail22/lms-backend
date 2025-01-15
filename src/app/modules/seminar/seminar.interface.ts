import { Types } from "mongoose";

export interface ISeminar {
  name: string;
  description: string;
  coverImage: string;
  startDate: string;
  category?:
    | "Graphics"
    | "Web Development"
    | "Video Editing"
    | "Digital Marketing"
    | "Other";
  trainers: [Types.ObjectId];
  isUpcoming: boolean;
  location?: string;
  googleFormUrl?: string;
  googleFormEmbedUrl?: string;
  isDeleted: boolean;
}
