import { Schema, model } from "mongoose";
import { TEducation } from "../../interfaces/TCommon.interface";
import { TStaff } from "./staff.interface";

const TEducationSchema = new Schema<TEducation>({
  institute: { type: String, required: [true, "Institute is required"] },
  degree: { type: String, required: [true, "Degree is required"] },
  year: { type: Number, required: [true, "Passing year is required"] },
});

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
  education: {
    type: [TEducationSchema],
    required: [true, "Education is required"],
  },
  email: { type: String, required: [true, "Email is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  fullName: {
    firstName: { type: String, required: [true, "First name is required"] },
    middleName: { type: String, required: [true, "Middle name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
  },
  address: {
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
  },
  dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  profileImage: { type: String, required: [true, "Profile image is required"] },
});

const Staff = model("Staff", staffSchema);
export default Staff;
