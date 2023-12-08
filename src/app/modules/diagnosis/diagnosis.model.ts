import { Schema, model } from "mongoose";
import { TDiagnosis } from "./diagnosis.interface";

const diagnosisSchema = new Schema<TDiagnosis>(
  {
    id: {
      type: String,
      required: [true, "Diagnosis id is required!"],
      unique: true,
    },

    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "patient id is required!"],
    },

    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor id is required!"],
    },

    labStaff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "Lab staff id is required!"],
    },

    diagnosisName: {
      type: String,
      required: [true, "Diagnosis name is required!"],
    },

    diagnosisDetails: {
      type: String,
      required: [true, "Diagnosis details is required!"],
    },
    charge: {
      type: Number,
      required: [true, "Charge amount is required!"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    testTime: {
      type: String,
      required: [true, "Test time is required!"],
    },
    reportTime: String,
  },
  {
    timestamps: true,
  },
);

export const Diagnosis = model<TDiagnosis>("Diagnosis", diagnosisSchema);
