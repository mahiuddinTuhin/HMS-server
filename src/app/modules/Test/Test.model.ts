/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";
import TTest from "./Test.interface";

// Create a Mongoose schema for MedicalTest
const testSchema = new Schema<TTest>({
  id: { type: String, required: true },
  testName: { type: String, required: true, minlength: 3 },
  testDetails: { type: String, required: true, minlength: 10 },
  associatedServices: [{ type: String }],
  machineDetails: {
    machineName: { type: String, required: true },
    machineModel: { type: String, required: true },
    manufacturer: { type: String, required: true },
    yearOfManufacture: { type: Number, required: true, min: 1900 },
  },
  benefits: [{ type: String }],
  patientCount: { type: Number, required: true, min: 0 },
  responsibleDoctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  cost: { type: Number, required: true, min: 0 },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Test = model<TTest>("Test", testSchema);

export default Test;
