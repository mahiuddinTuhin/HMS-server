/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import AppError from "../../util/customError";
import { TMedicalHistory } from "../MedicalHistory/medicalHistory.ineterface";
import { MedicalHistory } from "../MedicalHistory/medicalHistory.model";
import { TAppointments } from "../appointment/appointment.interface";
import { TDoctor } from "./doctors.interface";
import { Doctor } from "./doctors.model";

/* creating an appointment by doctor */
const createAppointment = async (data: TAppointments) => {
  const session = await startSession();
  try {
    session.startTransaction();
    /* checking whether doctor is available or not */
    const doesDoctorExist = await Doctor.findOne({
      doctorId: data?.doctorId,
    });

    if (!doesDoctorExist) {
      throw new AppError(
        "Doctor does not exist. Enter doctor id properly.",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (doesDoctorExist) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tookSchedule = await Doctor.findOne({
        doctorId: data?.doctorId,
        pendingAppointments: {
          $elemMatch: {
            date: data?.date,
            time: data?.time,
          },
        },
      });

      if (tookSchedule) {
        throw new AppError(
          "Doctor does not available on that time. Change time or date.",
          StatusCodes.BAD_REQUEST,
        );
      }
    }

    const newAppointment = new Doctor({
      date: data?.date,
      time: data?.time,
      patientId: data?.patientId,
      doctorId: data?.doctorId,
    });

    const validationError = newAppointment.validateSync();

    if (validationError) {
      throw new AppError(
        "Failed to create appointment!! date/time ",
        StatusCodes.BAD_REQUEST,
      );
    } else {
      // If validation passed, add the new appointment to the pendingAppointments array
      const updatedDoctor = await Doctor.findOneAndUpdate(
        { doctorId: data?.doctorId },
        { $push: { pendingAppointments: newAppointment } },
        { new: true },
      );
    }

    if (!newAppointment || !newAppointment) {
      throw new AppError(
        "Failed to create appointment!!",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newAppointment;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      "Failed to create appointment!!",
      StatusCodes.BAD_REQUEST,
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
