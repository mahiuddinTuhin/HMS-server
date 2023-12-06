"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = exports.doctorSchema = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../../schema/CommonSchema");
const doctor_constant_1 = require("./doctor.constant");
exports.doctorSchema = new mongoose_1.Schema({
    id: {
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "MedicalHistory",
        },
    ],
    pendingAppointments: [
        {
            date: {
                type: String,
                required: true,
            },
            time: {
                type: String,
                required: true,
            },
        },
    ],
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        ref: "Department",
        required: [true, "Department id is required!"],
    },
    education: [CommonSchema_1.utilsSchema.nonPatientEducationSchema],
    license_info: String,
}, {
    timestamps: true,
    _id: false,
});
exports.Doctor = (0, mongoose_1.model)("Doctors", exports.doctorSchema);
