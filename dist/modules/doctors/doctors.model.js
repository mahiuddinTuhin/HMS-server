"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = exports.doctorSchema = exports.medicalHistorySchema = void 0;
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    home: String,
    office: String,
    email: String,
});
exports.medicalHistorySchema = new mongoose_1.Schema({
    medical_id: Number,
});
exports.doctorSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        index: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
    },
    schedule: [String],
    medicalHistory: [exports.medicalHistorySchema],
    contactInfo: contactSchema,
    specialization: String,
    education: [String],
    license_info: String,
    present_address: String,
    permanent_address: String,
    date_of_birth: String,
    gender: String,
}, {
    timestamps: true,
});
exports.Doctor = (0, mongoose_1.model)("Doctors", exports.doctorSchema);
