import { Types } from "mongoose";
import { Course } from "../course/course.model";
import { ICourseProgress } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Initialize progress when a student enrolls in a course
const initializeCourseProgress = async ({
  studentId,
  courseId,
}: {
  studentId: string;
  courseId: string;
}) => {
  console.log(studentId, courseId);
  const student = await Student.findById(studentId);

  if (!student) throw new AppError(httpStatus.NOT_FOUND, "Student not found");

  // Define the type of the populated course document
  const course = await Course.findById(courseId).populate<{
    subjects: Array<{
      _id: Types.ObjectId;
      topics: Array<{
        _id: Types.ObjectId;
        lessons: Array<{
          _id: Types.ObjectId;
        }>;
      }>;
    }>;
  }>({
    path: "subjects",
    populate: {
      path: "topics",
      populate: {
        path: "lessons",
        model: "Lesson",
      },
      model: "Topic",
    },
    model: "Subject",
  });

  if (!course) throw new AppError(httpStatus.NOT_FOUND, "Course not found");

  // Check if the student already has progress for this course
  const courseProgress = student.courses.find(
    (c) => c.courseId.toString() === courseId,
  );

  // If no progress exists, initialize progress for all subjects, topics, and lessons
  if (!courseProgress) {
    const newCourseProgress: ICourseProgress = {
      courseId: course._id,
      subjects: course.subjects.map((subject) => ({
        subjectId: subject._id,
        topics: subject.topics.map((topic) => ({
          topicId: topic._id,
          lessons: topic.lessons.map((lesson) => ({
            lessonId: lesson._id,
            isCompleted: false,
            completedAt: null,
          })),
        })),
      })),
    };

    // Add the new course progress to the student's courses array
    student.courses.push(newCourseProgress);
    await student.save(); // Save the updated student document
    return newCourseProgress; // Return the new course progress for confirmation
  } else {
    // If progress already exists, return the existing progress
    return courseProgress;
  }
};

// Create a student
const createStudentInDB = async (data: {
  name: string;
  email: string;
  courses?: { courseId: string }[];
}) => {
  // Create the student
  const student = await Student.create({
    name: data.name,
    email: data.email,
    courses: [],
  });
  return student;
};

const getLastCompletedLesson = async (studentId: string, courseId: string) => {
  const student = await Student.findById(studentId).populate({
    path: "courses",
    match: { courseId }, // Match the specific course in the courses array by courseId
    populate: {
      path: "subjects",
      populate: {
        path: "topics",
        populate: {
          path: "lessons",
          model: "Lesson", // Populate lessons using the Lesson model
        },
        model: "Topic", // Populate topics using the Topic model
      },
    },
  });

  if (!student) throw new Error("Student not found");

  // Find the specific course progress in the student's courses
  const courseProgress = student.courses.find(
    (course) => course.courseId && course.courseId.toString() === courseId,
  );

  if (!courseProgress) throw new Error("Course progress not found");

  // Initialize last completed lesson variable
  let lastCompletedLessonId = null;

  // Iterate over subjects, topics, and lessons with null checks
  for (const subject of courseProgress.subjects || []) {
    for (const topic of subject.topics || []) {
      for (const lesson of topic.lessons || []) {
        if (!lesson.isCompleted) {
          // Return the last completed lesson if a lesson is not completed
          return lastCompletedLessonId;
        }
        lastCompletedLessonId = lesson.lessonId;
      }
    }
  }

  if (lastCompletedLessonId === null) {
    throw new AppError(httpStatus.NOT_FOUND, "Not found any completed lesson.");
  }
  return lastCompletedLessonId;
};

const updateLessonProgress = async ({
  studentId,
  courseId,
  lessonId,
}: {
  studentId: string;
  courseId: string;
  lessonId: string;
}) => {
  const student = await Student.findById(studentId).populate({
    path: "courses",
    match: { courseId }, // Match the specific course
    populate: {
      path: "subjects",
      populate: {
        path: "topics",
        populate: {
          path: "lessons",
          model: "Lesson", // Ensuring `Lesson` model is used for `lessons`
        },
        model: "Topic", // Ensuring `Topic` model is used for `topics`
      },
      model: "Subject", // Ensuring `Subject` model is used for `subjects`
    },
  });

  if (!student) throw new AppError(httpStatus.NOT_FOUND, "Student not found");

  // Check if the specific course progress exists for this courseId
  const courseProgress = student.courses.find(
    (course) => course.courseId.toString() === courseId,
  );

  if (!courseProgress) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Course not found for this student",
    );
  }

  // Traverse subjects in the course to locate the specified lesson
  for (const subject of courseProgress.subjects) {
    for (const topic of subject.topics) {
      for (let i = 0; i < topic.lessons.length; i++) {
        const lessonProgress = topic.lessons[i];

        // Check if the lesson matches the one we're updating
        if (lessonProgress.lessonId.toString() === lessonId) {
          // Mark the lesson as completed
          lessonProgress.isCompleted = true;
          lessonProgress.completedAt = new Date();

          // Unlock the next lesson, if it exists
          if (i + 1 < topic.lessons.length) {
            topic.lessons[i + 1].isCompleted = false; // Ensure next lesson is available
          }

          await student.save();
          return lessonProgress; // Return the updated lesson progress
        }
      }
    }
  }

  // If the specified lesson was not found in progress data, throw an error
  throw new AppError(
    httpStatus.NOT_FOUND,
    "Lesson not found in course progress",
  );
};

export const StudentServices = {
  createStudentInDB,
  initializeCourseProgress,
  getLastCompletedLesson,
  updateLessonProgress,
};