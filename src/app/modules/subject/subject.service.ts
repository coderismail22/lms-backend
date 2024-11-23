import httpStatus from "http-status";
import { TSubject } from "./subject.interface";
import { Subject } from "./subject.model";
import AppError from "../../errors/AppError";
import { Topic } from "../topic/topic.model";

const createSubjectIntoDB = async (subject: TSubject) => {
  return Subject.create(subject);
};

const updateSubjectInDB = async (
  subjectId: string,
  subjectData: Partial<TSubject>,
) => {
  const subject = await Subject.findByIdAndUpdate(subjectId, subjectData, {
    new: true,
  });
  if (!subject) throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  return subject;
};

const linkTopicToSubject = async (data: {
  subjectId: string;
  topicId: string;
}) => {
  const { subjectId, topicId } = data;

  const subject = await Subject.findById(subjectId);
  if (!subject) throw new AppError(httpStatus.NOT_FOUND, "Subject not found");

  const topic = await Topic.findById(topicId);
  if (!topic) throw new AppError(httpStatus.NOT_FOUND, "Topic not found");

  if (!subject.topics.includes(topic._id)) {
    subject.topics.push(topic._id);
  }

  return subject.save();
};

const getSubjectFromDB = async (subjectId: string) => {
  const subject = await Subject.findById(subjectId).populate("topics");
  if (!subject) throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  return subject;
};

const getAllSubjectsFromDB = async () => {
  return Subject.find().populate("topics");
};

const deleteSubjectFromDB = async (subjectId: string) => {
  const subject = await Subject.findById(subjectId);
  if (!subject) throw new AppError(httpStatus.NOT_FOUND, "Subject not found");
  const result = await subject.deleteOne();
  return result;
};

export const SubjectServices = {
  createSubjectIntoDB,
  updateSubjectInDB,
  linkTopicToSubject,
  getSubjectFromDB,
  getAllSubjectsFromDB,
  deleteSubjectFromDB,
};
