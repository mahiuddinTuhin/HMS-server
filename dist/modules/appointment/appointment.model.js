"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.appointmentSchema = void 0;
const mongoose_1 = require("mongoose");
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
