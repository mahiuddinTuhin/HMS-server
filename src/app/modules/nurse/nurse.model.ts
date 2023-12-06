import { Schema, model } from "mongoose";
import { TNurse } from "../nurse/nurse.interface";

export const nurseSchema = new Schema<TNurse>(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      ref: "Users",
      required: [true, "Nurse id is required!"],
    },

    shift: {
      type: String,
      required: [true, "Nurse's Sift is required!"],
      enum: ["day", "night"],
      message: "{VALUE} is not accepted as schedule!",
    },
  },
  {
    timestamps: true,
  },
);

export const Nurse = model<TNurse>("Nurse", nurseSchema);
