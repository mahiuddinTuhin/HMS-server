"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nurse = exports.nurseSchema = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../utils/CommonSchema");
exports.nurseSchema = new mongoose_1.Schema(
  {
    nurseId: {
      type: String,
      index: true,
      unique: true,
      ref: "Users",
      required: [true, "Nurse id is required!"],
    },
    shift: {
      type: String,
      required: [true, "Nurse's Sift is required!"],
      enum: ["day", "night"],
      message: "{VALUE} is not accepted as schedule!",
    },
    contactInfo: CommonSchema_1.utilsSchema.nonPatientContactSchema,
    education: [CommonSchema_1.utilsSchema.nonPatientEducationSchema],
    personalInfo: CommonSchema_1.utilsSchema.NonPatientPersonalInfo,
  },
  {
    timestamps: true,
  },
);
exports.Nurse = (0, mongoose_1.model)("Nurse", exports.nurseSchema);
