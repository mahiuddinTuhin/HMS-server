/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../util/customError";
import { TMedicalHistory } from "../MedicalHistory/medicalHistory.ineterface";
import { MedicalHistory } from "../MedicalHistory/medicalHistory.model";
import { TAppointments } from "../appointment/appointment.interface";
import { Appointment } from "../appointment/appointment.model";
import { TDoctor } from "./doctors.interface";
import { Doctor } from "./doctors.model";

/* creating an appointment by doctor */
const createAppointment = async (data: TAppointments) => {
  try {
    const newDepartment: any = await Appointment.create(data);
    if (!newDepartment) {
      throw new AppError(
        "Creating appointment failed! from doctor services.",
        StatusCodes.BAD_REQUEST,
      );
    }
    return newDepartment;
  } catch (error) {
    throw new AppError(
      `Creating department failed from services!: ${error}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

/* creating a medical history by doctor */
const createMedicalHistory = async (data: TMedicalHistory) => {
  try {
    const newMedicalHistory: any = await MedicalHistory.create(data);
    if (!newMedicalHistory) {
      throw new AppError(
        "Creating Medical History failed! from doctor services.",
        StatusCodes.BAD_REQUEST,
      );
    }
    return newMedicalHistory;
  } catch (error) {
    throw new AppError(
      `Creating Medical History  failed from doctor services!: ${error}`,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const findDocByIdService = async (id: string) => {
  const doc = await Doctor.find({ doctorsId: id });
  return doc;
};

const deleteDocByIdService = async (id: string) => {
  const allDoc = await Doctor.deleteOne({ doctorsId: id });
  return allDoc;
};

const updateDocByIdService = async (id: string, data: Partial<TDoctor>) => {
  const updatedDoc = await Doctor.findById(id, { data }, { new: true });
  return updatedDoc;
};

const getAllDocService = async () => {
  const allDoc = await Doctor.find();
  return allDoc;
};

export const doctorServices = {
  findDocByIdService,
  updateDocByIdService,
  getAllDocService,
  deleteDocByIdService,
  createAppointment,
  createMedicalHistory,
};
