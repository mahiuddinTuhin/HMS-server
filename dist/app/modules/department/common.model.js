"use strict";
/*
 * Medical problem schema
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalSpecializationSchema = exports.medicalProblemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.medicalProblemSchema = new mongoose_1.Schema({
    problemName: {
        type: String,
        required: [true, "Problem name is required!"],
        unique: true,
    },
    problemHints: {
        type: String,
        required: [true, "Problem hints is required!"],
    },
    symptoms: [
        {
            type: String,
            required: [true, "Problem Symptoms is required!"],
        },
    ],
    supportsFromHospital: [
        {
            type: String,
            required: [true, "Support for Problem from hospital is required!"],
        },
    ],
    treatments: [
        {
            type: String,
            required: [true, "treatments for this problem is required!"],
        },
    ],
}, {
    _id: false,
});
/*
 * Medical specialization section schema
 */
exports.medicalSpecializationSchema = new mongoose_1.Schema({
    specializationName: {
        type: String,
        required: [true, "Specialization Name name is required!"],
        unique: true,
    },
    specializationDetails: {
        type: String,
        required: [true, "Specialization Details name is required!"],
    },
    problems: [exports.medicalProblemSchema],
    doctors: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "Doctor",
        },
    ],
});
