import { Seminar } from "./seminar.model";
import { ISeminar } from "./seminar.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createSeminarInDB = async (payload: ISeminar) => {
  const seminar = await Seminar.create(payload);
  return seminar;
};

const getSeminarFromDB = async (seminarId: string) => {
  const seminar = await Seminar.findById(seminarId);
  if (!seminar) {
    throw new AppError(httpStatus.NOT_FOUND, "Seminar not found");
  }
  return seminar;
};

const getAllSeminarsFromDB = async () => {
  const seminars = await Seminar.find();
  return seminars;
};

const updateSeminarInDB = async (
  seminarId: string,
  payload: Partial<ISeminar>,
) => {
  const seminar = await Seminar.findByIdAndUpdate(seminarId, payload, {
    new: true,
  });
  if (!seminar) {
    throw new AppError(httpStatus.NOT_FOUND, "Seminar not found");
  }
  return seminar;
};

const deleteSeminarFromDB = async (seminarId: string) => {
  const seminar = await Seminar.findByIdAndDelete(seminarId);
  if (!seminar) {
    throw new AppError(httpStatus.NOT_FOUND, "Seminar not found");
  }
};

export const SeminarServices = {
  createSeminarInDB,
  getSeminarFromDB,
  getAllSeminarsFromDB,
  updateSeminarInDB,
  deleteSeminarFromDB,
};
