"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
// Create a Mongoose schema for MedicalTest
const testSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    testName: { type: String, required: true, minlength: 3 },
    testDetails: { type: String, required: true, minlength: 10 },
    associatedServices: [{ type: String }],
    machineDetails: {
        machineName: { type: String, required: true },
        machineModel: { type: String, required: true },
        manufacturer: { type: String, required: true },
        yearOfManufacture: { type: Number, required: true, min: 1900 },
    },
    benefits: [{ type: String }],
    patientCount: { type: Number, required: true, min: 0 },
    responsibleDoctor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
        validate: {
            validator: function (value) {
                console.log({ data: mongoose_1.Types.ObjectId.isValid(value) });
                return mongoose_1.Types.ObjectId.isValid(value);
            },
            message: "Invalid ObjectId format for responsibleDoctor",
        },
    },
    cost: { type: Number, required: true, min: 0 },
});
const Test = (0, mongoose_1.model)("Test", testSchema);
exports.default = Test;
