import httpStatus from "http-status";
import { TTopic } from "./topic.interface";
import { Topic } from "./topic.model";
import AppError from "../../errors/AppError";
import { Lesson } from "../lesson/lesson.model";

// Create a new topic in the database
const createTopicIntoDB = async (topicData: TTopic) => {
  return Topic.create(topicData);
};

// Get a single topic by ID
const getTopicFromDB = async (topicId: string) => {
  const topic = await Topic.findById(topicId).populate("lessons");
  if (!topic) throw new AppError(httpStatus.NOT_FOUND, "Topic not found");
  return topic;
};

// Get all topics
const getAllTopicsFromDB = async () => {
  return Topic.find({ isDeleted: false }).populate("lessons");
};

// Update a topic
const updateTopicInDB = async (topicId: string, topicData: Partial<TTopic>) => {
  const topic = await Topic.findByIdAndUpdate(topicId, topicData, {
    new: true,
  });
  if (!topic) throw new AppError(httpStatus.NOT_FOUND, "Topic not found");
  return topic;
};

// Link a lesson to a topic
const linkLessonToTopic = async (data: {
  topicId: string;
  lessonId: string;
}) => {
  const { topicId, lessonId } = data;

  const topic = await Topic.findById(topicId);
  if (!topic) throw new AppError(httpStatus.NOT_FOUND, "Topic not found");

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");

  if (!topic.lessons.includes(lesson._id)) {
    topic.lessons.push(lesson._id);
  }

  return topic.save();
};

// Soft delete a topic
const deleteTopicFromDB = async (topicId: string) => {
  const topic = await Topic.findById(topicId);
  if (!topic) throw new AppError(httpStatus.NOT_FOUND, "Topic not found");
  topic.isDeleted = true;
  return topic.save();
};

export const TopicServices = {
  createTopicIntoDB,
  getTopicFromDB,
  getAllTopicsFromDB,
  updateTopicInDB,
  linkLessonToTopic,
  deleteTopicFromDB,
};
