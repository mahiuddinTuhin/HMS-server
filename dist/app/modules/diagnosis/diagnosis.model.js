"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnosis = void 0;
const mongoose_1 = require("mongoose");
const diagnosisSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Diagnosis id is required!"],
        unique: true,
    },
    patient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Patient",
        required: [true, "patient id is required!"],
    },
    doctor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Doctor",
        required: [true, "Doctor id is required!"],
    },
    labStaff: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Staff",
        required: [true, "Lab staff id is required!"],
    },
    diagnosisName: {
        type: String,
        required: [true, "Diagnosis name is required!"],
    },
    diagnosisDetails: {
        type: String,
        required: [true, "Diagnosis details is required!"],
    },
    charge: {
        type: Number,
        required: [true, "Charge amount is required!"],
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    testTime: {
        type: String,
        required: [true, "Test time is required!"],
    },
    reportTime: String,
}, {
    timestamps: true,
});
exports.Diagnosis = (0, mongoose_1.model)("Diagnosis", diagnosisSchema);
