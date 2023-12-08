import { Schema, model } from "mongoose";
import { TPatient } from "./patient.interface";

const patientSchema = new Schema<TPatient>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User _id is required!"],
      ref: "User",
    },
    id: {
      type: String,
      required: [true, "Id is required!"],
    },

    allMedicalHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalHistory",
        // unique: true,
      },
    ],

    pendingAppointments: [
      {
        doctor: {
          type: Schema.Types.ObjectId,
          ref: "Doctor",
        },
        date: {
          type: String,
        },
        time: {
          type: String,
        },
      },
    ],
    allAppointmentHistory: [
      {
        doctor: {
          type: Schema.Types.ObjectId,
          ref: "Doctor",
        },
        date: {
          type: String,
        },
        time: {
          type: String,
        },
      },
    ],
    allDiagnosis: [
      {
        type: Schema.Types.ObjectId,
        ref: "Diagnosis",
      },
    ],
    isAdmitted: {
      type: Boolean,
      default: false,
    },
    currentMedicalDepartment: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },

    bills: Number,

    contactNumber: String,

    emergencyContact: String,

    insuranceInfo: String,

    guardian: String,
  },
  {
    timestamps: true,
  },
);

export const Patient = model<TPatient>("Patients", patientSchema);
