"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = exports.doctorSchema = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../utils/CommonSchema");
const doctor_constant_1 = require("./doctor.constant");
exports.doctorSchema = new mongoose_1.Schema(
  {
    doctorId: {
      type: String,
      index: true,
      unique: true,
      ref: "Users",
      required: [true, "Doctor id is required!"],
    },
    schedule: [
      {
        type: String,
        enum: doctor_constant_1.schedules,
        message: "{VALUE} is not accepted as schedule!",
      },
    ],
    allMedicalHistory: [
      {
        type: String,
        unique: true,
        ref: "MedicalHistory",
      },
    ],
    contactInfo: CommonSchema_1.utilsSchema.nonPatientContactSchema,
    departmentId: {
      type: String,
      unique: true,
      ref: "Department",
      required: [true, "Department id is required!"],
    },
    education: [CommonSchema_1.utilsSchema.nonPatientEducationSchema],
    license_info: String,
    personalInfo: CommonSchema_1.utilsSchema.NonPatientPersonalInfo,
  },
  {
    timestamps: true,
  },
);
exports.Doctor = (0, mongoose_1.model)("Doctors", exports.doctorSchema);
