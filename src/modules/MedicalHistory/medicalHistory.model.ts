import { Schema, model } from "mongoose";
import { TMedicalHistory } from "./medicalHistory.ineterface";

const medicalHistorySchema = new Schema<TMedicalHistory>({
  medicalHistoryId: {
    type: String,
    required: [true, "Medical History Id is required."],
    unique: true,
  },
  doctorId: {
    type: String,
    required: [true, "Doctor Id is required."],
    ref: "Doctors",
    unique: true,
  },
  patientId: {
    type: String,
    ref: "Patients",
    unique: true,
    required: [true, "Patient Id is required."],
  },
  diagonosisId: [
    {
      type: String,
      ref: "Diagnosis",
      unique: true,
      required: [true, "Diagnosis Id is required."],
    },
  ],
  medications: [String],
  releasedOn: String,
  bill: {
    type: Number,
    required: [true, "Bill is required!"],
  },
  doctorComments: String,
  patientComments: String,
});

export const MedicalHistory = model<TMedicalHistory>(
  "MedicalHistory",
  medicalHistorySchema,
);
