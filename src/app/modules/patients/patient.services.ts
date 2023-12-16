/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from "mongoose";
import AppError from "../../errors/customError";
import generateServiceId from "../../utils/generateServiceId";
import { TAppointments } from "../appointment/appointment.interface";
import { Appointment } from "../appointment/appointment.model";
import { Doctor } from "../doctors/doctors.model";
import { TPatient } from "./patient.interface";
import { Patient } from "./patient.model";

/**
 *
 * @service
 * @creating patient
 */

const ceateAppointment = async (data: TAppointments) => {
  const session = await startSession();

  try {
    session.startTransaction();

    data.id = await generateServiceId(Appointment);

    const doctor = await Doctor.findById(data?.doctor)
      .select("pendingAppointments")
      .populate("pendingAppointments");

    if (!doctor) {
      throw new AppError("Doctor id is not found.", 400);
    }

    const isBooked =
      doctor?.pendingAppointments?.find(
        (appointment: any) =>
          appointment?.time === data?.time && appointment?.date === data?.date,
      ) || false;

    if (isBooked) {
      throw new AppError(
        "Doctor is not available on this time or date, Change date,time or both.",
        409,
      );
    }

    /* if doctor will be available on the specific time and date then creating appointment and modify doctor and patient collections. */

    const oldApp: any = await Appointment.find();
    const newAppointment: any = await Appointment.create([data], { session });

    // console.log({ oldApp });
    if (!newAppointment) {
      console.log("failed app");
    }

    /* modify doctor */
    await Doctor.findByIdAndUpdate(
      data?.doctor,
      {
        $push: {
          pendingAppointments: newAppointment[0]?._id,
        },
      },
      {
        session,
      },
    );

    /* modify patient */
    await Patient.findByIdAndUpdate(
      data?.patient,
      {
        $push: {
          pendingAppointments: newAppointment[0]?._id,
        },
      },
      {
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
    return newAppointment;
  } catch (error: any) {
    // console.log({ errorss: error instanceof AppError });
    if (error instanceof AppError) {
      throw new AppError(error.message, 409);
    }
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(error.message, 400);
  }
};

const getAllPatient = async () => {
  const result = await Patient.find();

  if (!result) {
    throw new Error("Patient retrieve failed.");
  }
  return result;
};

const getPatientById = async (id: string) => {
  const result = await Patient.findById(id);

  if (!result) {
    throw new Error("Patient retrieve failed.");
  }
  return result;
};

const deleteAppointmentById = async (id: string) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const appointment: any = await Appointment.findById(id);

    if (!appointment) {
      throw new AppError("Appointment does not found to delete.", 400);
    }

    const isClosed = await Appointment.findByIdAndUpdate(
      appointment?._id,
      {
        isClosed: true,
      },
      {
        session,
      },
    );

    await Doctor.findByIdAndUpdate(
      appointment?.doctor,
      {
        $pull: {
          pendingAppointments: appointment?._id,
        },
      },
      {
        session,
      },
    );

    await Patient.findByIdAndUpdate(
      appointment?.patient,
      {
        $pull: {
          pendingAppointments: appointment?._id,
        },
      },
      {
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
    return isClosed;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    if (
      error instanceof AppError &&
      error.message.includes("Appointment does not found to delete")
    ) {
      throw new AppError(error.message, 400);
    }

    throw new AppError("Failed to delete Appointment", 400);
  }
};

const updatePatientById = async (id: number, data: TPatient) => {
  const result = await Patient.updateOne({ userId: id }, { data });
  if (!result) {
    throw new Error("Patient update failed.");
  }
  return result;
};

export const patientServices = {
  ceateAppointment,
  deleteAppointmentById,
  updatePatientById,
  getAllPatient,
  getPatientById,
};
