import { Schema, model } from "mongoose";
import { TDiagnosis } from "./diagnosis.interface";

const diagnosisSchema = new Schema<TDiagnosis>({
  diagnosisId: {
    type: String,
    required: [true, "Diagnosis id is required!"],
    unique: true,
  },

  patientId: {
    type: String,
    ref: "Patients",
    unique: true,
    required: [true, "patient id is required!"],
  },

  doctorId: {
    type: String,
    ref: "Doctors",
    unique: true,
    required: [true, "Doctor id is required!"],
  },

  labStaffId: {
    type: String,
    ref: "Staff",
    unique: true,
    required: [true, "Lab staff id is required!"],
  },

  diagnosisName: {
    type: String,
    required: [true, "Diagnosis name is required!"],
  },

  diagnosisDetails: {
    type: String,
    required: [true, "Diagnosis details is required!"],
  },
  costs: {
    type: Number,
    required: [true, "Cost amount is required!"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  testTime: {
    type: String,
    required: [true, "Test time is required!"],
  },
  reportTime: String,
});

export const Diagnosis = model<TDiagnosis>("Diagnosis", diagnosisSchema);
