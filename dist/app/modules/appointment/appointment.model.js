"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.appointmentSchema = void 0;
const mongoose_1 = require("mongoose");
const doctor_constant_1 = require("../doctors/doctor.constant");
exports.appointmentSchema = new mongoose_1.Schema({
    appointmentId: {
        type: String,
        unique: true,
        required: [true, "Appointment id is required!"],
    },
    doctorId: {
        type: String,
        unique: true,
        ref: "Doctors",
        required: [true, "Doctor id is required!"],
    },
    patientId: {
        type: String,
        unique: true,
        ref: "Patient",
        required: [true, "Patient id is required!"],
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    schedule: {
        type: String,
        enum: {
            values: doctor_constant_1.schedules,
            message: "{{VALUE}} is not acceptable as schedule. please enter any one of the following time. 9:00 AM, 10:00 AM,  11:00 AM,  12:00 PM,  1:00 PM,  2:00 PM,  3:00 PM, 4:00 PM,  5:00 PM,  6:00 PM,",
        },
        required: [true, "Schedule is required!"],
    },
    isClosed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Appointment = (0, mongoose_1.model)("Appointment", exports.appointmentSchema);
