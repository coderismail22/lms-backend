import { Types } from "mongoose";
import { Course } from "../course/course.model";
import { ICourseProgress } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

// Get a student
const getStudent = async (studentEmail: string) => {
  const student = await Student.findOne({ email: studentEmail }).select({
    _id: 1,
    name: 1,
    email: 1,
  });
  return student;
};
// Get all students
const getAllStudents = async () => {
  const students = await Student.find();
  return students;
};

// Get a single course's details for a specific student, including progress tracking
const getCourseDetailsForStudent = async (
  studentId: string,
  courseId: string,
) => {

  // Check if the course exists in the database
  const courseExists = await Course.exists({ _id: courseId });

  if (!courseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Fetch the student with populated courses
  const student = await Student.findById(studentId).populate({
    path: "courses.courseId",
    populate: {
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
    },
  });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  // Find the specific course in the student's enrolled courses
  const courseProgress = student.courses.find(
    (course) => course.courseId && course.courseId._id.toString() === courseId,
  );

  // Check if the course progress was found
  if (!courseProgress) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Course progress not found for the student",
    );
  }

  return courseProgress; // Returns detailed course information with progress
};

// Initialize progress when a student enrolls in a course
const initializeCourseProgress = async ({
  studentId,
  courseId,
}: {
  studentId: string;
  courseId: string;
}) => {
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
          lessons: topic.lessons.map((lesson, index) => ({
            lessonId: lesson._id,
            isCompleted: false,
            completedAt: null,
            isAccessible: index === 0, // Only the first lesson is accessible initially
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

// Get all courses for a specific student, with progress information
const getAllCoursesForStudent = async (userId: string) => {
  // find user
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  // Find student id
  const student = await Student.findOne({ email: user?.email }).populate({
    path: "courses.courseId",
    model: "Course", // Populating the courseId field
    populate: {
      path: "subjects.subjectId", // Populating the subjectId field within the course
      model: "Subject",
      populate: {
        path: "topics.topicId", // Populating the topicId field within the subject
        model: "Topic",
        populate: {
          path: "lessons.lessonId", // Populating the lessonId field within the topic
          model: "Lesson",
        },
      },
    },
  });

  if (!student) throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  const courses = student?.courses;
  const studentId = student?._id;
  return { courses, studentId }; // Returns courses with limited details for list view
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
  // Find the student and populate the necessary course structure
  const student = await Student.findById(studentId).populate({
    path: "courses",
    match: { courseId }, // Match the specific course in the courses array by courseId
    populate: {
      path: "subjects",
      populate: {
        path: "topics",
        populate: {
          path: "lessons",
          model: "Lesson", // Ensure `Lesson` model is used for `lessons`
        },
        model: "Topic", // Ensure `Topic` model is used for `topics`
      },
      model: "Subject", // Ensure `Subject` model is used for `subjects`
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

          // Unlock the next lesson, if it exists (skip this for the last lesson)
          if (i + 1 < topic.lessons.length) {
            topic.lessons[i + 1].isAccessible = true; // Unlock the next lesson
          }

          // Save the updated student document
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
  getStudent,
  getAllStudents,
  initializeCourseProgress,
  getAllCoursesForStudent,
  getCourseDetailsForStudent,
  getLastCompletedLesson,
  updateLessonProgress,
};
