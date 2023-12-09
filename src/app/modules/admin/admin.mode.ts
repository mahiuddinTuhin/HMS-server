import { Schema, model } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";
import { utilsSchema } from "../../schema/CommonSchema";
import {
  birthDatePattern,
  emailPattern,
  phonePattern,
} from "../../validation/Common.Validation";
import { TAdmin } from "./admin.interface";

export const adminSchema = new Schema<TAdmin>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
    },
    id: { type: String, required: [true, "Nurse ID is required"] },
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
    fullName: utilsSchema.fullNameSchema,
    address: utilsSchema.addressSchema,
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

export const Admin = model<TAdmin>("Admin", adminSchema);
