import mongoose, { model } from "mongoose";
import { TMedicalTest } from "./medicalTest.interface";

const { Schema } = mongoose;

const MedicalTestSchema = new Schema<TMedicalTest>({
  id: { type: String, required: [true, "Medical Test Id is required."] },
  name: { type: String, required: [true, "Name is required."] },
  charge: { type: Number, required: [true, "Charge is required."] },
  isPaid: { type: Boolean, default: true },
  reports: [{ type: Object, required: [true, "Reports is required."] }],
  summary: { type: String, required: [true, "Summary is required."] },
  equipments: { type: [String], required: [true, "Equipments is required."] },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: [true, "Doctor is required."],
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Patient is required."],
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    required: [true, "Staff is required."],
  },
  delivery: { type: String, required: [true, "Delivery date is required."] },
});

export const MedicalTest = model<TMedicalTest>(
  "MedicalTest",
  MedicalTestSchema,
);
