import mongoose, { Document, Schema } from "mongoose";
import { TLaboratory } from "./labratory.interface";

// Define a Mongoose schema for Laboratory
const LaboratorySchema = new Schema<TLaboratory & Document>({
  id: { type: String, required: true, unique: true },
  labName: { type: String, required: true, unique: true },
  equipments: [{ type: String }],
  allStaff: [{ type: String, ref: "Staff", unique: true }],
  testsOffers: [{ type: String }],
  contactInfo: [{ type: String }],
  allDiagnosisHistory: [{ type: String, ref: "Diagnosist", unique: true }],
});

// Create and export the Mongoose model based on the schema
const Laboratory = mongoose.model<TLaboratory>("Laboratory", LaboratorySchema);

export default Laboratory;
