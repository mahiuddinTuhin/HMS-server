"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.appointmentSchema = void 0;
const mongoose_1 = require("mongoose");
const doctor_constant_1 = require("../doctors/doctor.constant");
exports.appointmentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: [true, "Appointment id is required!"],
    },
    doctor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Doctors",
        required: [true, "Doctor id is required!"],
    },
    patient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "Patient id is required!"],
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    time: {
        type: String,
        enum: {
            values: doctor_constant_1.schedules,
            message: "{{VALUE}} is not acceptable as schedule. please enter any one of the following time. 9:00am, 9.30am, 10:00am, 10:30am, 11:00am, 11:30am, 12:00pm, 12:30pm, 2:00pm, 2:30pm, 3:00pm, 3:30pm, 4:00pm, 4:30pm, 5:00pm, 5:30pm",
        },
        required: [true, "Schedule is required!"],
    },
    date: {
        type: String,
        required: [true, "Date id is required!"],
    },
    isClosed: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Appointment = (0, mongoose_1.model)("Appointment", exports.appointmentSchema);
