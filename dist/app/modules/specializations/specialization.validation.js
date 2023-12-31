"use strict";
/*
 * medical problem validation with zod
 */
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const medicalProblemValidation = zod_1.z.object({
    problemName: zod_1.z.string(),
    problemHints: zod_1.z.string(),
    symptoms: zod_1.z.array(zod_1.z.string()),
    supportsFromHospital: zod_1.z.array(zod_1.z.string()),
    treatments: zod_1.z.array(zod_1.z.string()),
});
/*
 * medical specialization section validation with zod
 */
const specializationsValidation = zod_1.z.object({
    body: zod_1.z.object({
        specializationName: zod_1.z.string(),
        specializationDetails: zod_1.z.string(),
        problems: zod_1.z.array(medicalProblemValidation),
    }),
});
exports.default = specializationsValidation;
