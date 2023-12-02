import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { TStaff } from "./staff.interface";

const staffSchema = new Schema<TStaff>({
  staffId: {
    type: String,
    required: [true, "Staff id is required"],
  },
  shift: String,
  contactInfo: utilsSchema.nonPatientContactSchema,
  education: [utilsSchema.nonPatientEducationSchema],
  personalInfo: utilsSchema.NonPatientPersonalInfo,
});

export const Staff = model("Staff", staffSchema);
