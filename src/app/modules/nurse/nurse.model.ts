import mongoose, { Schema } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";
import {
  birthDatePattern,
  emailPattern,
  phonePattern,
} from "../../validation/Common.Validation";
import { TNurse } from "./nurse.interface";

const NurseSchema = new Schema<TNurse>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
    },
    id: { type: String, required: [true, "Nurse ID is required"] },
    shift: {
      type: String,
      enum: ["day", "night"],
      required: [
        true,
        'Shift is required and should be either "day" or "night"',
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailPattern, "Invalid email format"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [phonePattern, "Invalid phone number format"],
    },
    education: {
      type: [{ type: Object }], // Assuming TEducation structure is complex; can be refined
      validate: {
        validator: (eduArray: TEducation[]) => eduArray.length > 0,
        message: "At least one education entry is required",
      },
    },
    fullName: {
      firstName: { type: String, required: [true, "First name is required"] },
      middleName: { type: String, required: [true, "Middle name is required"] },
      lastName: { type: String, required: [true, "Last name is required"] },
    },
    address: {
      presentAddress: {
        type: String,
        required: [true, "Present address is required"],
      },
      permanentAddress: {
        type: String,
        required: [true, "Permanent address is required"],
      },
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
      match: [birthDatePattern, "Invalid date format (YYYY-MM-DD)"],
    },
    gender: { type: String, required: [true, "Gender is required"] },
    profileImage: {
      type: String,
      required: [true, "Profile image URL is required"],
    },
  },
  { timestamps: true },
);

const Nurse = mongoose.model<TNurse>("Nurse", NurseSchema);

export default Nurse;
