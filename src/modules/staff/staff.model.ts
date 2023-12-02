import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { TStaff } from "./staff.interface";

const staffSchema = new Schema<TStaff>({
  staffId: {
    type: String,
    required: [true, "Staff id is required"],
  },
  shift: {
    type: String,
    enum: ["night", "day"],
    message: "Staff's shift should be night or day!",
    required: [true, "Shift is required"],
  },
  contactInfo: utilsSchema.nonPatientContactSchema,
  education: [utilsSchema.nonPatientEducationSchema],
  personalInfo: utilsSchema.NonPatientPersonalInfo,
});

export const Staff = model("Staff", staffSchema);
