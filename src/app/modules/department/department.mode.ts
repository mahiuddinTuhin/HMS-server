import mongoose, { Schema } from "mongoose";
import { TDepartment } from "./department.interface";

// Define a Mongoose schema for TDepartment
const DepartmentSchema = new Schema<TDepartment>(
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
    allDoctors: [{ type: Schema.Types.ObjectId, ref: "doctor", unique: true }],
    licences: { type: String, required: true, unique: true },
    allMedicalHistory: [
      { type: Schema.Types.ObjectId, ref: "MedicalHistory", unique: true },
    ],
  },
  { strict: true },
);

// Create and export the Mongoose model based on the schema
const Department = mongoose.model<TDepartment>("Department", DepartmentSchema);

export default Department;
