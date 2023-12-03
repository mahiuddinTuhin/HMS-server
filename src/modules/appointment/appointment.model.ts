import { Schema, model } from "mongoose";
import { schedules } from "../doctors/doctor.constant";
import { TAppointments } from "./appointment.interface";

export const appointmentSchema = new Schema<TAppointments>(
  {
    appointmentId: {
      type: String,
      unique: true,
      required: [true, "Appointment id is required!"],
    },

    doctorId: {
      type: String,
      unique: true,
      ref: "Doctors",
      required: [true, "Doctor id is required!"],
    },
    patientId: {
      type: String,
      unique: true,
      ref: "Patient",
      required: [true, "Patient id is required!"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      enum: {
        values: schedules,
        message:
          "{{VALUE}} is not acceptable as schedule. please enter any one of the following time. 9:00 AM, 10:00 AM,  11:00 AM,  12:00 PM,  1:00 PM,  2:00 PM,  3:00 PM, 4:00 PM,  5:00 PM,  6:00 PM,",
      },
      required: [true, "Schedule is required!"],
    },

    date: {
      type: String,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Appointment = model<TAppointments>(
  "Appointment",
  appointmentSchema,
);
