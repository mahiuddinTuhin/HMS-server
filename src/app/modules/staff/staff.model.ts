import { Schema, model } from "mongoose";
import { utilsSchema } from "../../schema/CommonSchema";
import { TStaff } from "./staff.interface";

const staffSchema = new Schema<TStaff>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
  },
  id: { type: String, required: [true, "ID is required"] },
  shift: {
    type: String,
    enum: ["day", "night"],
    required: [true, "Shift is required"],
  },
  education: [utilsSchema.nonPatientEducationSchema],
  email: { type: String, required: [true, "Email is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  fullName: utilsSchema.fullNameSchema,
  address: utilsSchema.addressSchema,
  dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  profileImage: { type: String, required: [true, "Profile image is required"] },
});

const Staff = model("Staff", staffSchema);
export default Staff;
