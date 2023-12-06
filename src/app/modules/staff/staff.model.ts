import { Schema, model } from "mongoose";
import { utilsSchema } from "../utils/CommonSchema";
import { TStaff } from "./staff.interface";

const staffSchema = new Schema<TStaff>({
  id: {
    type: String,
    required: [true, "Staff id is required"],
    unique: true,
  },
  shift: {
    type: String,
    enum: ["night", "day"],
    message: "Staff's shift should be night or day!",
    required: [true, "Shift is required"],
  },

  education: [utilsSchema.nonPatientEducationSchema],
});

export const Staff = model("Staff", staffSchema);
