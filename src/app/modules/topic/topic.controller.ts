import { Request, Response } from "express";

import httpStatus from "http-status";
import { TopicServices } from "./topic.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

// Create a new topic
const createTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicServices.createTopicIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic created successfully",
    data: result,
  });
});

// Get a single topic by ID
const getTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicServices.getTopicFromDB(req.params.topicId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic retrieved successfully",
    data: result,
  });
});

// Get all topics
const getAllTopics = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicServices.getAllTopicsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All topics retrieved successfully",
    data: result,
  });
});

// Update a topic
const updateTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicServices.updateTopicInDB(
    req.params.topicId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic updated successfully",
    data: result,
  });
});

// Link a lesson to a topic
const linkLessonToTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicServices.linkLessonToTopic(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Lesson linked to topic successfully",
    data: result,
  });
});

// Delete a topic (soft delete)
const deleteTopic = catchAsync(async (req: Request, res: Response) => {
  const result = await TopicServices.deleteTopicFromDB(req.params.topicId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic deleted successfully",
    data: result,
  });
});

export const TopicControllers = {
  createTopic,
  getTopic,
  getAllTopics,
  updateTopic,
  linkLessonToTopic,
  deleteTopic,
};
