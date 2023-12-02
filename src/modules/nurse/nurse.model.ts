import { Schema, model } from "mongoose";
import { TNurse } from "../nurse/nurse.interface";
import { utilsSchema } from "../utils/CommonSchema";

export const nurseSchema = new Schema<TNurse>(
  {
    nurseId: {
      type: String,
      index: true,
      unique: true,
      ref: "User",
      required: [true, "Nurse id is required!"],
    },

    shift: {
      type: String,
      required: [true, "Nurse's Sift is required!"],
      enum: ["day", "night"],
      message: "{VALUE} is not accepted as schedule!",
    },

    contactInfo: utilsSchema.nonPatientContactSchema,
    education: [utilsSchema.nonPatientEducationSchema],
    personalInfo: utilsSchema.NonPatientPersonalInfo,
  },
  {
    timestamps: true,
  },
);

export const Nurse = model<TNurse>("Nurse", nurseSchema);
