"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnosis = void 0;
const mongoose_1 = require("mongoose");
const diagnosisSchema = new mongoose_1.Schema({
    diagnosisId: {
        type: String,
        required: [true, "Diagnosis id is required!"],
        unique: true,
    },
    patientId: {
        type: String,
        ref: "Patients",
        unique: true,
    },
    doctorId: {
        type: String,
        ref: "Doctors",
        unique: true,
    },
    labStaffId: {
        type: String,
        ref: "Staff",
        unique: true,
    },
    adminId: {
        type: String,
        ref: "Admin",
        unique: true,
    },
    diagnosisName: [
        {
            type: String,
            required: [true, "Diagnosis name is required!"],
        },
    ],
    diagnosisDetails: [
        {
            type: String,
            required: [true, "Diagnosis details is required!"],
        },
    ],
    costs: {
        type: Number,
        required: [true, "Cost amount is required!"],
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    testTime: {
        type: String,
        required: [true, "Test time is required!"],
    },
    reportTime: String,
});
exports.Diagnosis = (0, mongoose_1.model)("Diagnosis", diagnosisSchema);
