import { Schema, model } from "mongoose";
import { schedules } from "../doctors/doctor.constant";
import { TAppointments } from "./appointment.interface";

export const appointmentSchema = new Schema<TAppointments>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, "Appointment id is required!"],
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctors",
      required: [true, "Doctor id is required!"],
    },
    patient: {
      type: Schema.Types.ObjectId,
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
          "{{VALUE}} is not acceptable as schedule. please enter any one of the following time. 9:00am, 9.30am, 10:00am, 10:30am, 11:00am, 11:30am, 12:00pm, 12:30pm, 2:00pm, 2:30pm, 3:00pm, 3:30pm, 4:00pm, 4:30pm, 5:00pm, 5:30pm",
      },
      required: [true, "Schedule is required!"],
    },
    date: {
      type: String,
      required: [true, "Date id is required!"],
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
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
