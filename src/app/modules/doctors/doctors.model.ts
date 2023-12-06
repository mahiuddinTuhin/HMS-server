import { Schema, model } from "mongoose";
import { utilsSchema } from "../../schema/CommonSchema";
import { schedules } from "./doctor.constant";
import { TDoctor } from "./doctors.interface";

export const doctorSchema = new Schema<TDoctor>(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      ref: "Users",
      required: [true, "Doctor id is required!"],
    },

    schedule: [
      {
        type: String,
        enum: schedules,
        message: "{VALUE} is not accepted as schedule!",
      },
    ],
    allMedicalHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalHistory",
      },
    ],
    pendingAppointments: [
      {
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    department: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "Department",
      required: [true, "Department id is required!"],
    },
    education: [utilsSchema.nonPatientEducationSchema],
    license_info: String,
  },
  {
    timestamps: true,
    _id: false,
  },
);

export const Doctor = model<TDoctor>("Doctors", doctorSchema);
