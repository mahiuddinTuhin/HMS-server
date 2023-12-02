import mongoose, { Document, Schema } from "mongoose";
import { TLaboratory } from "./labratory.interface";

// Define a Mongoose schema for Laboratory
const LaboratorySchema = new Schema<TLaboratory & Document>({
  labId: { type: String, required: true },
  labName: { type: String, required: true },
  equipments: [{ type: String }],
  allStaff: [{ type: String, ref: "Staff" }],
  testsOffers: [{ type: String }],
  contactInfo: [{ type: String }],
  allDiagnosisHistory: [{ type: String, ref: "Diagnosist" }],
});

// Create and export the Mongoose model based on the schema
const LaboratoryModel = mongoose.model<TLaboratory>(
  "Laboratory",
  LaboratorySchema,
);

export default LaboratoryModel;
