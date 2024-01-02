import mongoose, { model } from "mongoose";
import { TmedicalTestReport } from "./medicalTestReport.interface";

const { Schema } = mongoose;

const medicalTestReportSchema = new Schema<TmedicalTestReport>({
  id: { type: String, required: [true, "Medical Test Id is required."] },
  isPaid: { type: Boolean, default: true },
  reports: [{ type: Object }],
  summary: { type: String },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Patient is required."],
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: "Test",
    required: [true, "test id is required."],
  },

  reportAvailableDate: {
    type: String,
    required: [true, "Report Available date is required."],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const MedicalTestReport = model<TmedicalTestReport>(
  "medicalTestReport",
  medicalTestReportSchema,
);
