import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
  adminId: {
    type: String,
    ref: "User",
    unique: true,
    index: true,
    required: [true, "User id is required!"],
  },

  contactInfo: utilsSchema.nonPatientContactSchema,

  education: utilsSchema.nonPatientEducationSchema,

  personalInfo: utilsSchema.NonPatientPersonalInfo,
});

export const Admin = model("Admin", adminSchema);
