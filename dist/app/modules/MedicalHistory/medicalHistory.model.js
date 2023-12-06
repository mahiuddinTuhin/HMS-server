"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalHistory = void 0;
const mongoose_1 = require("mongoose");
const medicalHistorySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Medical History Id is required."],
        unique: true,
    },
    doctor: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Doctor Id is required."],
        ref: "Doctors",
        unique: true,
    },
    patient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Patients",
        unique: true,
        required: [true, "Patient Id is required."],
    },
    diagonosis: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Diagnosis",
            unique: true,
            required: [true, "Diagnosis Id is required."],
        },
    ],
    medications: [String],
    releasedOn: String,
    bill: {
        type: Number,
        required: [true, "Bill is required!"],
    },
    doctorComments: String,
    patientComments: String,
});
exports.MedicalHistory = (0, mongoose_1.model)("MedicalHistory", medicalHistorySchema);
