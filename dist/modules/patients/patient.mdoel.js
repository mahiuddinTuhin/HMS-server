"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../utils/CommonSchema");
const patientSchema = new mongoose_1.Schema({
  patientId: {
    type: String,
    required: [true, "User id is required!"],
    ref: "Users",
    unique: true,
  },
  allMedicalHistory: [
    {
      type: String,
      ref: "MedicalHistory",
      unique: true,
    },
  ],
  allAppointmentHistory: [
    {
      type: String,
      ref: "Appointment",
      unique: true,
    },
  ],
  allDiagnosis: [
    {
      type: String,
      ref: "Diagnosis",
      unique: true,
    },
  ],
  isAdmitted: {
    type: Boolean,
    default: false,
  },
  currentMedicalDepartment: {
    type: String,
    ref: "Department",
    unique: true,
  },
  bills: Number,
  contactNumber: String,
  emergencyContact: String,
  insuranceInfo: String,
  guardian: CommonSchema_1.utilsSchema.patientGuardianSchema,
  personalInfo: CommonSchema_1.utilsSchema.patientPersonalInfo,
});
exports.Patient = (0, mongoose_1.model)("Patients", patientSchema);
