import { Schema, model } from "mongoose";
import { schedules } from "../doctors/doctor.constant";
import { utilsSchema } from "../utils/CommonSchema";
import { TPatient } from "./patient.interface";

const patientSchema = new Schema<TPatient>(
  {
    patientId: {
      type: String,
      required: [true, "User id is required!"],
      ref: "User",
      unique: true,
    },

    allMedicalHistory: [
      {
        type: String,
        ref: "MedicalHistory",
        unique: true,
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
        doctorId: {
          type: String,
          ref: "Doctors",
          required: true,
        },
      },
    ],
    allDiagnosis: [
      {
        type: String,
        ref: "Diagnosis",
        unique: true,
      },
    ],
    isAdmitted: {
      type: Boolean,
      default: false,
    },
    currentMedicalDepartment: {
      type: String,
      ref: "Department",
      unique: true,
    },

    bills: Number,

    contactNumber: String,

    emergencyContact: String,

    insuranceInfo: String,

    guardian: utilsSchema.patientGuardianSchema,

    personalInfo: utilsSchema.patientPersonalInfo,
  },
  {
    timestamps: true,
    _id: false,
  },
);

export const Patient = model<TPatient>("Patients", patientSchema);
