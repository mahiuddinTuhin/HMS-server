import { Schema, model } from "mongoose";
import { TNurse } from "./nurse.interface";

const nurseSchema = new Schema<TNurse>({
  nurseId: String,
  shift: String,
  contactInfo: String,
  education: [String],
  personalInfo: [String],
});
export const Nurse = model("Nurse", nurseSchema);
