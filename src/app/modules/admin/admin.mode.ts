import { Schema, model } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";
import { TAdmin } from "./admin.interface";

export const educationSchema = new Schema<TEducation>(
  {
    degree: { type: String, required: true },
    institute: { type: String, required: true },
    year: { type: Number, required: true },
  },
  { _id: false },
);

// Create a Mongoose schema based on TAdmin interface
const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    education: [educationSchema],
    fullName: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: {
      presentAddress: { type: String, required: true },
      permanentAddress: { type: String, required: true },
    },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    profileImage: { type: String, required: true },
  },
  { timestamps: true },
);

export const Admin = model<TAdmin>("Admin", adminSchema);
