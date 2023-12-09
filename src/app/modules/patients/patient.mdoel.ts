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

    allMedicalHistory: [{ type: Schema.Types.ObjectId, ref: "MedicalHistory" }],

    pendingAppointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    allAppointmentHistory: [
      { type: Schema.Types.ObjectId, ref: "Appointment" },
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

    emergencyContact: String,

    insuranceInfo: String,

    guardian: String,
  },
  {
    timestamps: true,
  },
);

export const Patient = model<TPatient>("Patients", patientSchema);
