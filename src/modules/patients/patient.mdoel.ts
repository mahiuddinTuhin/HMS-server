import { Schema, model } from "mongoose";
import { TPatient } from "./patient.interface";

const patientSchema = new Schema<TPatient>({
  patientId: {
    type: String,
    required: [true, "User id is required!"],
    unique: true,
  },

  allMedicalHistory: [String],
  allAppointmentHistory: [String],
  bills: Number,
  contactNumber: {
    type: String,
    required: [true, "Required a contact numnber!"],
  },
  emergencyContact: String,
  insuranceInfo: String,
  personalInfo: [String],
  guardian: String,
  currentMedicalDepartment: String,
});

export const Patient = model<TPatient>("Patients", patientSchema);
