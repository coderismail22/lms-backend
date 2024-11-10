import httpStatus from "http-status";
import { TTopic } from "./topic.interface";
import { Topic } from "./topic.model";
import AppError from "../../errors/AppError";
import { Lesson } from "../lesson/lesson.model";
import { Course } from "../course/course.model";
import { syncCourseProgress } from "../course/course.utils";

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
  console.log(topicId);
  console.log(lessonId);

  // Find the topic and check if it exists
  const topic = await Topic.findById(topicId);
  if (!topic) throw new AppError(httpStatus.NOT_FOUND, "Topic not found");

  // Find the lesson and check if it exists
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw new AppError(httpStatus.NOT_FOUND, "Lesson not found");

  // Link the lesson to the topic if it’s not already linked
  if (!topic.lessons.includes(lesson._id)) {
    topic.lessons.push(lesson._id);
  }

  // Save the updated topic with the new lesson
  await topic.save();

  // Find the associated course ID for the topic
  const course = await Course.findOne({ subjects: topic.subjectId });
  if (!course) throw new AppError(httpStatus.NOT_FOUND, "Course not found");

  // Sync course progress for all students in this course
  await syncCourseProgress(course._id.toString());

  return topic;
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
