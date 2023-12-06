import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required in admin !"],
    unique: true,
    ref: "User",
  },
  id: {
    type: String,
    required: [true, "id is required in admin!"],
  },

  contactInfo: utilsSchema.nonPatientContactSchema,

  education: utilsSchema.nonPatientEducationSchema,

  personalInfo: utilsSchema.NonPatientPersonalInfo,
});

export const Admin = model("Admin", adminSchema);
