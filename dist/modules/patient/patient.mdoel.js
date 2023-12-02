"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const guardianSchema = new mongoose_1.Schema({
    name: String,
    contactNumber: String,
    address: String,
});
const doctorSchema = new mongoose_1.Schema({
    id: Number,
    name: String,
    specialty: String,
});
const appointmentSchema = new mongoose_1.Schema({
    id: Number,
    doctorId: Number,
    date: Date,
    serial: Number,
});
const medicalHistory = new mongoose_1.Schema({
    date: String,
    diagonosis: String,
    medications: [String],
    doctor: doctorSchema,
});
const patientSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: [true, "User id is required!"],
        unique: true,
    },
    user_Id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User id is required!"],
        ref: "Users",
        unique: true,
    },
    medicalHistory: [medicalHistory],
    appointments: [appointmentSchema],
    billing: Number,
    contactNumber: String,
    emergencyContact: String,
    insuranceInfo: String,
    presentAddress: String,
    permanentAddress: String,
    guardian: guardianSchema,
    DOF: Date,
    gender: String,
    currentMedicalDepartment: String,
});
exports.Patient = (0, mongoose_1.model)("Patient", patientSchema);
