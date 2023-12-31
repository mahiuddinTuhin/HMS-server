"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = exports.doctorSchema = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../../schema/CommonSchema");
const Common_Validation_1 = require("../../validation/Common.Validation");
const doctor_constant_1 = require("./doctor.constant");
exports.doctorSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: [true, "Doctor id is required!"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User id is required!"],
    },
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Department",
        required: [true, "Department id is required!"],
    },
    specializations: [
        {
            type: String,
            required: [true, "specializations is required"],
        },
    ],
    schedules: {
        type: [String],
        enum: doctor_constant_1.schedules,
        default: doctor_constant_1.schedules,
        required: [true, "{VALUE} is not accepted as schedule!"],
    },
    allMedicalHistory: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "MedicalHistory",
        },
    ],
    pendingAppointments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Appointment",
        },
    ],
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [Common_Validation_1.emailPattern, "Invalid email format"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    education: {
        type: [{ type: Object }],
        validate: {
            validator: (eduArray) => eduArray.length > 0,
            message: "At least one education entry is required",
        },
    },
    fullName: CommonSchema_1.utilsSchema.fullNameSchema,
    address: CommonSchema_1.utilsSchema.addressSchema,
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required"],
        match: [Common_Validation_1.birthDatePattern, "Invalid date format (YYYY-MM-DD)"],
    },
    gender: { type: String, required: [true, "Gender is required"] },
    profileImage: {
        type: String,
        required: [true, "Profile image URL is required"],
    },
    license_info: {
        type: String,
        required: [true, "license_info is required"],
    },
}, {
    timestamps: true,
});
exports.Doctor = (0, mongoose_1.model)("Doctor", exports.doctorSchema);
