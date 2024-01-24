import { Schema, model } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";
import { utilsSchema } from "../../schema/CommonSchema";
import {
  birthDatePattern,
  emailPattern,
} from "../../validation/Common.Validation";
import { schedules } from "./doctor.constant";
import { TDoctor } from "./doctors.interface";

export const doctorSchema = new Schema<TDoctor>(
  {
    id: {
      type: String,
      unique: true,
      required: [true, "Doctor id is required!"],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required!"],
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department id is required!"],
    },
    specializations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Specialization",
        required: [true, "specializations is required"],
      },
    ],

    schedules: {
      type: [String],
      enum: schedules,
      default: schedules,
      required: [true, "{VALUE} is not accepted as schedule!"],
    },
    allMedicalHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalHistory",
      },
    ],
    pendingAppointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [emailPattern, "Invalid email format"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    education: {
      type: [{ type: Object }],
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
    license_info: {
      type: String,
      required: [true, "license_info is required"],
    },
  },
  {
    timestamps: true,
  },
);

export const Doctor = model<TDoctor>("Doctor", doctorSchema);
