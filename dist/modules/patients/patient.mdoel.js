"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    patientId: {
        type: String,
        required: [true, "User id is required!"],
        unique: true,
    },
    allMedicalHistory: [String],
    allAppointmentHistory: [String],
    bills: Number,
    contactNumber: {
        type: String,
        required: [true, "Required a contact numnber!"],
    },
    emergencyContact: String,
    insuranceInfo: String,
    personalInfo: [String],
    guardian: String,
    currentMedicalDepartment: String,
});
exports.Patient = (0, mongoose_1.model)("Patients", patientSchema);
