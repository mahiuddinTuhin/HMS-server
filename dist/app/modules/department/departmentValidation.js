"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const DepartmentValidation = zod_1.z.object({
    departmentName: zod_1.z
        .string({
        required_error: "Department Name is required",
        invalid_type_error: "Department Name must be a string",
    })
        .min(3),
    details: zod_1.z
        .string({
        required_error: "Detail of department is required",
        invalid_type_error: "Detail of department must be a string",
    })
        .min(20),
    allDoctors: zod_1.z.array(zod_1.z.string().optional()),
    licences: zod_1.z
        .string({
        required_error: "Licences is required",
        invalid_type_error: "Licences must be a string",
    })
        .min(10),
    allMedicalHistory: zod_1.z.array(zod_1.z.string().optional()),
});
exports.default = DepartmentValidation;
