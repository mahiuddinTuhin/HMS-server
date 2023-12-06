import { Schema, model } from "mongoose";
import { TMedicalHistory } from "./medicalHistory.ineterface";

const medicalHistorySchema = new Schema<TMedicalHistory>({
  id: {
    type: String,
    required: [true, "Medical History Id is required."],
    unique: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    required: [true, "Doctor Id is required."],
    ref: "Doctors",
    unique: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patients",
    unique: true,
    required: [true, "Patient Id is required."],
  },
  diagonosis: [
    {
      type: Schema.Types.ObjectId,
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
