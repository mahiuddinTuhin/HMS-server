/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * delete appointment by id service
 *
 * isClosed true from Appintment
 * remove appointment id from patient's pendingAppointment
 * remove appointment id from doctor's pendingAppointment
 *
 */

import { StatusCodes } from "http-status-codes";
import mongoose, { Types } from "mongoose";
import AppError from "../../errors/customError";
import { Doctor } from "../doctors/doctors.model";
import { Patient } from "../patients/patient.model";
import { Appointment } from "./appointment.model";

const deleteAppointment = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(async () => {
      /* finding id and update the isClosed field of appointment to true */

      const closedAppointment: any = await Appointment.findByIdAndUpdate(
        {
          _id: new Types.ObjectId(id),
        },
        {
          $set: { isClosed: true },
        },
        { new: true, session },
      );

      if (!closedAppointment) {
        throw new AppError(
          "Appointment does not exist. Enter Appointment id properly.",
          StatusCodes.BAD_REQUEST,
        );
      }

      /* finding doctor data by user id  and update*/

      await Doctor.findOneAndUpdate(
        { user: closedAppointment?.doctor },
        {
          $pull: {
            pendingAppointments: id,
          },
        },
        {
          session,
        },
      );

      /* finding patient data by user id  and update*/

      await Patient.findOneAndUpdate(
        { user: closedAppointment?.patient },
        {
          $pull: {
            pendingAppointments: id,
          },
        },
        {
          session,
        },
      );

      return true;
    });

    return result;

    /* check phind.com */
  } catch (error: any) {
    await session.endSession();
    throw new AppError(error?.message, 400);
  }
};

const appointmentService = { deleteAppointment };

export default appointmentService;
