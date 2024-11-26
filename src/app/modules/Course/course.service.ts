import httpStatus from "http-status";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import AppError from "../../errors/AppError";
// import { Subject } from "../subject/subject.model";

const createCourseIntoDB = async (course: TCourse) => {
  return Course.create(course);
};

const updateCourseInDB = async (
  courseId: string,
  courseData: Partial<TCourse>,
) => {
  const course = await Course.findByIdAndUpdate(courseId, courseData, {
    new: true,
  });
  if (!course) throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  return course;
};

// const linkSubjectToCourse = async (data: {
//   courseId: string;
//   subjectId: string;
// }) => {
//   const { courseId, subjectId } = data;

//   const course = await Course.findById(courseId);
//   if (!course) throw new AppError(httpStatus.NOT_FOUND, "Course not found");

//   const subject = await Subject.findById(subjectId);
//   if (!subject) throw new AppError(httpStatus.NOT_FOUND, "Subject not found");

//   if (!course.subjects.includes(subject._id)) {
//     course.subjects.push(subject._id);
//   }

//   return course.save();
// };

const getAllCoursesFromDB = async () => {
  const result = Course.find({ isDeleted: false }).populate({
    path: "subjects",
    populate: {
      path: "topics",
      populate: {
        path: "lessons",
        model: "Lesson",
      },
      model: "Topic",
    },
  });
  return result;
};
const getCourseFromDB = async (courseId: string) => {
  console.log(courseId);
  const course = await Course.findById(courseId).populate({
    path: "subjects",
    populate: {
      path: "topics",
      populate: {
        path: "lessons",
        model: "Lesson", // Ensure `Lesson` model is used here
      },
      model: "Topic", // Ensure `Topic` model is used here
    },
    model: "Subject", // Ensure `Subject` model is used here
  });

  console.log(course);

  if (!course) throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  return course;
};

const deleteCourseInDB = async (courseId: string) => {
  const course = await Course.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    { new: true },
  );
  if (!course) throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  return course;
};

export const CourseServices = {
  createCourseIntoDB,
  updateCourseInDB,
  // linkSubjectToCourse,
  getCourseFromDB,
  getAllCoursesFromDB,
  deleteCourseInDB,
};
