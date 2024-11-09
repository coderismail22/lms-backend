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

  if (!student) throw new Error("Student not found");

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

  if (!course) throw new Error("Course not found");

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

const updateLessonProgress = async (
  studentId: string,
  courseId: string,
  lessonId: string,
) => {
  const student = await Student.findById(studentId).populate({
    path: "courses",
    populate: {
      path: "subjects.topics.lessons.lessonId",
    },
  });
  if (!student) throw new Error("Student not found");

  const courseProgress = student.courses.find(
    (course) => course.courseId.toString() === courseId,
  );
  if (!courseProgress) throw new Error("Course progress not found");

  const course = await Course.findById(courseId).populate({
    path: "subjects",
    populate: { path: "topics.lessons" },
  });

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  const synchronizeProgress = () => {
    course.subjects.forEach((subject) => {
      let subjectProgress = courseProgress.subjects.find(
        (sub) => sub.subjectId.toString() === subject._id.toString(),
      );

      if (!subjectProgress) {
        subjectProgress = { subjectId: subject._id, topics: [] };
        courseProgress.subjects.push(subjectProgress);
      }

      subject.topics.forEach((topic) => {
        let topicProgress = subjectProgress.topics.find(
          (top) => top.topicId.toString() === topic._id.toString(),
        );

        if (!topicProgress) {
          topicProgress = { topicId: topic._id, lessons: [] };
          subjectProgress.topics.push(topicProgress);
        }

        topic.lessons.forEach((lesson) => {
          let lessonProgress = topicProgress.lessons.find(
            (les) => les.lessonId.toString() === lesson._id.toString(),
          );

          if (!lessonProgress) {
            lessonProgress = {
              lessonId: lesson._id,
              isCompleted: false,
              completedAt: null,
            };
            topicProgress.lessons.push(lessonProgress);
          }
        });
      });
    });
  };

  synchronizeProgress();
  await student.save();

  let lessonFound = false;

  for (const subject of courseProgress.subjects) {
    for (const topic of subject.topics) {
      for (let i = 0; i < topic.lessons.length; i++) {
        const lessonProgress = topic.lessons[i];

        if (lessonProgress.lessonId.toString() === lessonId) {
          if (i === 0 || topic.lessons[i - 1].isCompleted) {
            lessonProgress.isCompleted = true;
            lessonProgress.completedAt = new Date();
            lessonFound = true;

            if (i + 1 < topic.lessons.length) {
              topic.lessons[i + 1].isCompleted = false; // Unlock next lesson
            }
          } else {
            throw new Error("Previous lesson not completed, cannot unlock");
          }
          break;
        }
      }
      if (lessonFound) break;
    }
    if (lessonFound) break;
  }

  const result = await student.save();
  return result;
};

export const StudentServices = {
  createStudentInDB,
  initializeCourseProgress,
  getLastCompletedLesson,
  updateLessonProgress,
};
