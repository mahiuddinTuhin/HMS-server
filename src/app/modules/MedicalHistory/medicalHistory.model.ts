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
    ref: "Doctor",
    unique: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    unique: true,
    required: [true, "Patient Id is required."],
  },
  diagonosis: [
    {
      type: Schema.Types.ObjectId,
      ref: "Diagnosi",
      unique: true,
      required: [true, "Diagnosis Id is required."],
    },
  ],
  allMedications: [
    {
      date: Date,
      medications: [String],
    },
  ],
  releasedOn: String,
  bill: {
    type: Number,
    default: 0,
  },

  isPaid: {
    type: Boolean,
  },
  doctorComments: String,
  patientComments: String,

  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const MedicalHistory = model<TMedicalHistory>(
  "MedicalHistory",
  medicalHistorySchema,
);
