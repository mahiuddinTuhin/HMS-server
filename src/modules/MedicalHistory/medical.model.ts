import { Schema, model } from "mongoose";
import { TMedicalHistory } from "./medical.ineterface";

const medicalSchema = new Schema<TMedicalHistory>({
  doctorId: { type: String, required: [true, "Medical Id is required."] },
  medicalHistoryId: {
    type: String,
    ref: "Doctor",
    required: [true, "Doctor Id is required."],
  },
  patientId: {
    type: String,
    ref: "Patient",
    required: [true, "Patient Id is required."],
  },
  diagonosisId: [String],
  medications: [String],
  releasedOn: String,
  bill: Number,
});

export const Medical = model<TMedicalHistory>("MedicalHistory", medicalSchema);
