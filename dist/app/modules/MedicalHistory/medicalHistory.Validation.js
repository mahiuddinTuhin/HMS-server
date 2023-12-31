"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalValidation = void 0;
const zod_1 = require("zod");
exports.medicalValidation = zod_1.z.object({
    body: zod_1.z.object({
        doctorId: zod_1.z.string({
            required_error: "doctorId is required",
            invalid_type_error: "doctorId must be a string",
        }),
        patientId: zod_1.z.string({
            required_error: "patientId is required",
            invalid_type_error: "patientId must be a string",
        }),
        diagnosis: zod_1.z.array(zod_1.z.string()).min(1, "Diagnosis array cannot be empty"),
        medications: zod_1.z
            .array(zod_1.z.string())
            .min(1, "Medications array cannot be empty"),
        releasedOn: zod_1.z.string({
            required_error: "releasedOn is required",
            invalid_type_error: "releasedOn must be a string",
        }),
        bill: zod_1.z.number({
            required_error: "Bill is required",
            invalid_type_error: "Bill must be a number",
        }),
    }),
});
