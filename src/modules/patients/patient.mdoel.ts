import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { TPatient } from "./patient.interface";

const patientSchema = new Schema<TPatient>({
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
  allAppointmentHistory: [
    {
      type: String,
      ref: "Appointment",
      unique: true,
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
});

export const Patient = model<TPatient>("Patients", patientSchema);
