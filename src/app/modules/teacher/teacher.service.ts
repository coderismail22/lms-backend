import httpStatus from "http-status";
import { TTeacher } from "./teacher.interface";
import { Teacher } from "./teacher.model";
import AppError from "../../errors/AppError";

const createTeacherInDB = async (teacherData: TTeacher) => {
  const result = await Teacher.create(teacherData);
  return result;
};

const getTeacherFromDB = async (teacherId: string) => {
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  return teacher;
};

const getAllTeachersFromDB = async () => {
  const result = await Teacher.find().sort({ createdAt: -1 });
  return result;
};

const updateTeacherInDB = async (
  teacherId: string,
  teacherData: Partial<TTeacher>,
) => {
  const teacher = await Teacher.findByIdAndUpdate(teacherId, teacherData, {
    new: true,
    runValidators: true,
  });
  if (!teacher) throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  return teacher;
};

const deleteTeacherFromDB = async (teacherId: string) => {
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new AppError(httpStatus.NOT_FOUND, "Teacher not found");
  const result = await teacher.deleteOne();
  return result;
};

export const TeacherServices = {
  createTeacherInDB,
  getTeacherFromDB,
  getAllTeachersFromDB,
  updateTeacherInDB,
  deleteTeacherFromDB,
};
