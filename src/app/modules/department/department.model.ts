import mongoose, { Schema } from "mongoose";
import TDepartment from "./department.interface";

// Define a Mongoose schema for TDepartment
const departmentSchema = new Schema<TDepartment>(
  {
    id: {
      type: String,
      required: [true, "Department id is required!"],
      unique: true,
    },
    departmentName: {
      type: String,
      required: [true, "Department name is required!"],
      unique: true,
    },
    departmentDetails: {
      type: String,
      required: [true, "Details of department is required!"],
    },
    specializations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Specialization",
      },
    ],
    medicalLicense: {
      type: String,
      required: true,
    },
    medicalHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicalHistory",
      },
    ],
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    contact: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Mongoose model based on the schema
const Department = mongoose.model<TDepartment>("Department", departmentSchema);

export default Department;
