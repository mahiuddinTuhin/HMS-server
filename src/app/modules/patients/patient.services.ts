/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { startSession } from "mongoose";
import AppError from "../../errors/customError";
import generateServiceId from "../../utils/generateServiceId";
import { TAppointments } from "../appointment/appointment.interface";
import { Appointment } from "../appointment/appointment.model";
import { Doctor } from "../doctors/doctors.model";
import { TPatient } from "./patient.interface";
import { Patient } from "./patient.mdoel";

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

    const Booked = doctor?.pendingAppointments?.find(
      (appointment: any) =>
        appointment?.time === data?.time && appointment?.date === data?.date,
    );

    if (Booked) {
      console.log("doctor is not available");
      throw new AppError(
        "Doctor is not available on this time or date, Change date,time or both.",
        409,
      );
    }

    const newAppointment: any = await Appointment.create([data], { session });

    const updatedDoctor = await Doctor.findByIdAndUpdate(
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

    const updatedPatient = await Patient.findByIdAndUpdate(
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
  } catch (error) {
    if (
      error instanceof AppError &&
      error.message.includes("Doctor is not available")
    ) {
      throw new AppError(
        "Doctor is not available on this time or date, Change date,time or both.",
        409,
      );
    }
    await session.abortTransaction();
    await session.endSession();

    throw new AppError("Appointment creation failed", 400);
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

    const deleted = await Appointment.deleteOne(
      { _id: new ObjectId(appointment?._id) },
      {
        session,
      },
    );
    console.log({ deleted });

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
    return deleted;
  } catch (error) {
    if (
      error instanceof AppError &&
      error.message.includes("Appointment does not found to delete")
    ) {
      throw new AppError("Appointment does not found to delete", 400);
    }
    await session.abortTransaction();
    await session.endSession();

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
