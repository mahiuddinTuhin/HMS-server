"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User _id is required!"],
        ref: "User",
    },
    id: {
        type: String,
        required: [true, "Id is required!"],
    },
    allMedicalHistory: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "MedicalHistory" }],
    pendingAppointments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Appointment",
        },
    ],
    allAppointmentHistory: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    allDiagnosis: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Diagnosis",
        },
    ],
    isAdmitted: {
        type: Boolean,
        default: false,
    },
    currentMedicalDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Department",
    },
    bills: Number,
    emergencyContact: String,
    insuranceInfo: String,
    guardian: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Patient = (0, mongoose_1.model)("Patients", patientSchema);
