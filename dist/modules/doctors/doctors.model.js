"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = exports.doctorSchema = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    homeMobile: String,
    officeMobile: String,
    email: String,
});
exports.doctorSchema = new mongoose_1.Schema({
    doctorId: {
        type: String,
        index: true,
    },
    schedule: [String],
    allMedicalHistory: [String],
    contactInfo: contactSchema,
    departmentId: String,
    education: [String],
    license_info: String,
    personalInfo: String,
}, {
    timestamps: true,
});
exports.Doctor = (0, mongoose_1.model)("Doctors", exports.doctorSchema);
