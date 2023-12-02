import { Schema, model } from "mongoose";
import { TMedicalHistory } from "./medical.ineterface";

const medicalSchema = new Schema<TMedicalHistory>({
  medicalId: { type: String, required: [true, "Medical Id is required."] },
  doctorId: { 
    type: Schema.Types.ObjectId, 
    ref:"Doctor", 
    required: [true, "Doctor Id is required."] 
  },
  patientId: { 
    type: Schema.Types.ObjectId, 
    ref:"Patient", 
    required: [true, "Patient Id is required."] 
  },
  diagonosis: [String],
  medications: [String],
  releasedOn: String,
  bill: Number,
});

export const Medical = model<TMedicalHistory>("MedicalHistory", medicalSchema);
