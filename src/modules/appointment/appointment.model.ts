import { Schema, model } from "mongoose";
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
    schedule: {
      type: String,
      required: [true, "Schedule is required!"],
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
