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
        ref: "Patients",
        unique: true,
        required: [true, "patient id is required!"],
    },
    doctor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Doctors",
        unique: true,
        required: [true, "Doctor id is required!"],
    },
    labStaff: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Staff",
        unique: true,
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
    costs: {
        type: Number,
        required: [true, "Cost amount is required!"],
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
});
exports.Diagnosis = (0, mongoose_1.model)("Diagnosis", diagnosisSchema);
