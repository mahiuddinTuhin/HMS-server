"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../../schema/CommonSchema");
const patientSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User _id is required!"],
        unique: true,
        ref: "User",
    },
    id: {
        type: String,
        required: [true, "Id is required!"],
    },
    allMedicalHistory: [
        {
            type: String,
            ref: "MedicalHistory",
            // unique: true,
        },
    ],
    pendingAppointments: [
        {
            date: {
                type: String,
            },
            time: {
                type: String,
            },
        },
    ],
    allAppointmentHistory: [
        {
            type: String,
            ref: "Appointment",
            // unique: true,
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
}, {
    timestamps: true,
});
exports.Patient = (0, mongoose_1.model)("Patients", patientSchema);
