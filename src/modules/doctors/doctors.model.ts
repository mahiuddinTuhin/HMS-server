import { Schema, model } from "mongoose";
import { Tcontacts } from "../utils/TCommon.interface";
import { TDoctor } from "./doctors.interface";

const contactSchema = new Schema<Tcontacts>({
  homeMobile: String,
  officeMobile: String,
  email: String,
});

export const doctorSchema = new Schema<TDoctor>(
  {
    doctorId: {
      type: String,
      index: true,
    },

    schedule: [String],
    allMedicalHistory: [String],
    contactInfo: contactSchema,
    departmentId: String,
    education: [String],
    license_info: String,
    personalInfo: String,
  },
  {
    timestamps: true,
  },
);

export const Doctor = model<TDoctor>("Doctors", doctorSchema);
