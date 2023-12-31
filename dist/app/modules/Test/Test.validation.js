"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const TestValidation = zod_1.z.object({
    body: zod_1.z.object({
        testName: zod_1.z
            .string()
            .min(3, { message: "Test name must be at least 3 characters long" }),
        testDetails: zod_1.z
            .string()
            .min(10, { message: "Test details must be at least 10 characters long" }),
        associatedServices: zod_1.z.array(zod_1.z.string()),
        machineDetails: zod_1.z.object({
            machineName: zod_1.z.string(),
            machineModel: zod_1.z.string(),
            manufacturer: zod_1.z.string(),
            yearOfManufacture: zod_1.z
                .number()
                .min(1900, { message: "Invalid year of manufacture" }),
        }),
        benefits: zod_1.z.array(zod_1.z.string()),
        patientCount: zod_1.z
            .number()
            .int()
            .min(0, { message: "Patient count must be a non-negative integer" }),
        responsibleDoctor: zod_1.z.string(),
        cost: zod_1.z
            .number()
            .min(0, { message: "Cost must be a non-negative number" })
            .default(0),
    }),
});
exports.default = TestValidation;
