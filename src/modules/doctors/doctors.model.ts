import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { schedules } from "./doctor.constant";
import { TDoctor } from "./doctors.interface";

export const doctorSchema = new Schema<TDoctor>(
  {
    doctorId: {
      type: String,
      index: true,
      unique: true,
      ref: "User",
      required: [true, "Doctor id is required!"],
    },
    allMedicalHistory: [
      {
        type: String,
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
          enum: {
            values: schedules,
            message:
              "{{VALUE}} is not acceptable as schedule. please enter any one of the following time. 9:00am, 9.30am, 10:00am, 10.30am, 11:00am, 11.30am  12:00pm,  1:30pm,  2:00pm, 2.30pm, 3:00pm,3.30pm, 4:00pm, 4.30pm, 5:00pm, 5.30pm.",
          },
          required: [true, "Schedule is required!"],
        },
        patientId: {
          type: String,
          ref: "Patient",
          required: true,
        },
      },
    ],
    contactInfo: utilsSchema.nonPatientContactSchema,
    departmentId: {
      type: String,
      unique: true,
      ref: "Department",
      required: [true, "Department id is required!"],
    },
    education: [utilsSchema.nonPatientEducationSchema],
    license_info: String,
    personalInfo: utilsSchema.NonPatientPersonalInfo,
  },
  {
    timestamps: true,
    _id: false,
  },
);

export const Doctor = model<TDoctor>("Doctors", doctorSchema);
