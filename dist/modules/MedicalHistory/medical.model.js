"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Medical = void 0;
const mongoose_1 = require("mongoose");
const medicalSchema = new mongoose_1.Schema({
    doctorId: { type: String, required: [true, "Medical Id is required."] },
    medicalHistoryId: {
        type: String,
        ref: "Doctor",
        required: [true, "Doctor Id is required."],
    },
    patientId: {
        type: String,
        ref: "Patient",
        required: [true, "Patient Id is required."],
    },
    diagonosisId: [String],
    medications: [String],
    releasedOn: String,
    bill: Number,
});
exports.Medical = (0, mongoose_1.model)("MedicalHistory", medicalSchema);
