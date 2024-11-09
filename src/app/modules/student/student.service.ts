import { Types } from "mongoose";
import { Course } from "../course/course.model";
import { ICourseProgress } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Create a student
// const createStudent = async ({ studentId: string, courseId: string }) => {};

// Initialize progress when a student enrolls in a course
const initializeCourseProgress = async (
  studentId: string,
  courseId: string,
) => {
  // Type-safe find and populate operations
  const student = await Student.findById(studentId).populate<{
    courses: ICourseProgress[];
  }>({
    path: "courses",
    populate: {
      path: "subjects.topics.lessons.lessonId",
    },
  });

  if (!student) throw new Error("Student not found");

  const course = await Course.findById(courseId).populate<{
    subjects: {
      _id: Types.ObjectId;
      topics: { _id: Types.ObjectId; lessons: { _id: Types.ObjectId }[] }[];
    }[];
  }>({
    path: "subjects",
    populate: { path: "topics.lessons" },
  });

  if (!course) throw new Error("Course not found");

  const courseProgress = student.courses.find(
    (course) => course.courseId.toString() === courseId,
  );

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

    student.courses.push(newCourseProgress);
    await student.save();
    return newCourseProgress;
  } else {
    return courseProgress;
  }
};

const getLastCompletedLesson = async (studentId: string, courseId: string) => {
  const student = await Student.findById(studentId).populate<{
    courses: ICourseProgress[];
  }>({
    path: "courses",
    populate: {
      path: "subjects.topics.lessons.lessonId",
    },
  });

  if (!student) throw new AppError(httpStatus.NOT_FOUND, "Student not found");

  const courseProgress = student.courses.find(
    (course) => course.courseId.toString() === courseId,
  );

  if (!courseProgress)
    throw new AppError(httpStatus.NOT_FOUND, "Course progress not found");

  const course = await Course.findById(courseId).populate<{
    subjects: {
      _id: Types.ObjectId;
      topics: { _id: Types.ObjectId; lessons: { _id: Types.ObjectId }[] }[];
    }[];
  }>({
    path: "subjects",
    populate: { path: "topics.lessons" },
  });

  if (!course) throw new Error("Course not found");

  // Synchronize course progress with the latest structure from Course
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

  // Find the last completed lesson
  for (const subject of courseProgress.subjects) {
    for (const topic of subject.topics) {
      for (let i = 0; i < topic.lessons.length; i++) {
        if (!topic.lessons[i].isCompleted) {
          return i > 0 ? topic.lessons[i - 1].lessonId : null;
        }
      }
    }
  }
  return null;
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
  initializeCourseProgress,
  getLastCompletedLesson,
  updateLessonProgress,
};
