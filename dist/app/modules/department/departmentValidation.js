"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
/*
 * medical department validation with zod
 */
const DepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        departmentName: zod_1.z
            .string({
            required_error: "Department Name is required",
            invalid_type_error: "Department Name must be a string",
        })
            .min(3),
        departmentDetails: zod_1.z
            .string({
            required_error: "Detail of department is required",
            invalid_type_error: "Detail of department must be a string",
        })
            .min(20),
        specializations: zod_1.z.array(zod_1.z.string().optional()).optional(),
        medicalLicense: zod_1.z.array(zod_1.z
            .string({
            required_error: "Licences is required",
            invalid_type_error: "Licences must be a string",
        })
            .min(10)),
        medicalHistory: zod_1.z.array(zod_1.z.string().optional()).optional(),
        contact: zod_1.z.object({
            email: zod_1.z.array(zod_1.z.string()),
            phone: zod_1.z.array(zod_1.z.string()),
            address: zod_1.z.array(zod_1.z.string()),
        }),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.default = DepartmentValidation;
