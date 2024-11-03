import httpStatus from "http-status";
import { TSubject } from "./subject.interface";
import { Subject } from "./subject.model";
import AppError from "../../errors/AppError";
import { Course } from "../course/course.model";

// Create a subject
const createSubjectIntoDB = async (subject: TSubject) => {
  const result = Subject.create(subject);
  return result;
};

// Link subject to a course
const linkSubjectToCourse = async (data: {
  courseId: string;
  subjectId: string;
}) => {
  const { courseId, subjectId } = data;
  // Find Course
  const course = await Course.findById(courseId);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found.");
  }
  // Find Subject
  const subject = await Subject.findById(subjectId);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, "Subject not found.");
  }

  course.subjects.push(subject._id);
  const result = await course.save();

  return result;
};

// Get all subjects
const getSubjectsFromDB = async () => {
  const result = Subject.find();
  return result;
};
// Get a single subject
const getSubjectFromDB = async (id: string) => {
  const result = Subject.create(id);
  return result;
};

// Update a  subject
const updateSubjectIntoDB = async (id: string, payload: Partial<TSubject>) => {
  const result = Subject.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete a subject
const deleteSubjectFromDB = async (id: string) => {
  const result = Subject.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const SubjectServices = {
  createSubjectIntoDB,
  linkSubjectToCourse,
  getSubjectsFromDB,
  getSubjectFromDB,
  updateSubjectIntoDB,
  deleteSubjectFromDB,
};
