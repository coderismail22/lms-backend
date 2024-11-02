import { Schema, model } from "mongoose";
import { TTopic } from "./topic.interface";

const TopicSchema = new Schema<TTopic>({
  name: { type: String, required: true },
  description: { type: String },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject" },
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
});

export const Topic = model<TTopic>("Topic", TopicSchema);
