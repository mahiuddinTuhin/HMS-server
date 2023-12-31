"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const medicalProblemSchema = new mongoose_1.Schema({
    problemName: {
        type: String,
        unique: true,
        required: [true, "Problem name is required"],
    },
    problemHints: {
        type: String,
        required: [true, "Problem hints is required"],
    },
    symptoms: [
        {
            type: String,
            unique: true,
            required: [true, "Problem symptoms is required"],
        },
    ],
    supportsFromHospital: [
        {
            type: String,
            required: [true, "Supports list from hospital are required"],
        },
    ],
    treatments: [
        {
            type: String,
            required: [true, "Treatments name is required"],
        },
    ],
});
const specializationSchema = new mongoose_1.Schema({
    specializationName: {
        type: String,
        required: [true, "Specialization name is required"],
    },
    specializationDetails: {
        type: String,
        required: [true, "Specialization details is required"],
    },
    problems: [medicalProblemSchema],
    doctors: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: [true, "Doctor _id is required"],
        },
    ],
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Department _id is required"],
    },
});
const Specialization = (0, mongoose_1.model)("Specialization", specializationSchema);
exports.default = Specialization;
