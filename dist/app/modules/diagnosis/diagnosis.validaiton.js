"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const diagnosisValidation = zod_1.z.object({
    id: zod_1.z.string({
        required_error: "Diagnosis id is required!",
        invalid_type_error: "Diagnosis id must be a string",
    }),
    patient: zod_1.z.string(),
    doctor: zod_1.z.string(),
    labStaff: zod_1.z.string(),
    diagnosisName: zod_1.z.string({
        required_error: "Diagnosis name is required!",
        invalid_type_error: "Diagnosis name must be a string",
    }),
    diagnosisDetails: zod_1.z.string({
        required_error: "Diagnosis details is required!",
        invalid_type_error: "Diagnosis details must be a string",
    }),
    charge: zod_1.z.number({
        required_error: "Charge amount is required!",
        invalid_type_error: "Charge amount must be a number",
    }),
    isPaid: zod_1.z.boolean().default(false),
    testTime: zod_1.z.string({
        required_error: "Test time is required!",
        invalid_type_error: "Test time must be a string",
    }),
    reportTime: zod_1.z.string().optional(),
});
exports.default = diagnosisValidation;
