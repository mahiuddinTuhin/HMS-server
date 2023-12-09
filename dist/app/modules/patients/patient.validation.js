"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientValidation = void 0;
const zod_1 = require("zod");
exports.patientValidation = zod_1.z.object({
    user: zod_1.z
        .string()
        .refine((value) => value !== null, {
        message: "User ID is required",
    })
        .optional(),
    id: zod_1.z
        .string()
        .refine((value) => value !== null, {
        message: "ID is required",
    })
        .optional(),
    allMedicalHistory: zod_1.z.array(zod_1.z.string().optional()).optional(),
    pendingAppointments: zod_1.z
        .array(zod_1.z
        .object({
        doctor: zod_1.z.string().refine((value) => value !== null, {
            message: "Doctor ID is required",
        }),
        date: zod_1.z.string().refine((value) => value !== null, {
            message: "Date is required",
        }),
        time: zod_1.z.string().refine((value) => value !== null, {
            message: "Time is required",
        }),
    })
        .optional())
        .optional(),
    allAppointmentHistory: zod_1.z
        .array(zod_1.z
        .object({
        doctor: zod_1.z.string().refine((value) => value !== null, {
            message: "Doctor ID is required",
        }),
        date: zod_1.z.string().refine((value) => value !== null, {
            message: "Date is required",
        }),
        time: zod_1.z.string().refine((value) => value !== null, {
            message: "Time is required",
        }),
    })
        .optional())
        .optional(),
    allDiagnosis: zod_1.z
        .array(zod_1.z.string().optional())
        .refine((value) => value !== null, {
        message: "All diagnosis is required",
    })
        .optional(),
    isAdmitted: zod_1.z.boolean().default(false),
    currentMedicalDepartment: zod_1.z
        .string()
        .refine((value) => value !== null, {
        message: "Current medical department is required",
    })
        .optional(),
    bills: zod_1.z
        .number()
        .default(0)
        .refine((value) => value !== null, {
        message: "Bills is required",
    }),
    emergencyContact: zod_1.z
        .string()
        .refine((value) => value !== null, {
        message: "Emergency contact is required",
    })
        .optional(),
    insuranceInfo: zod_1.z
        .string()
        .refine((value) => value !== null, {
        message: "Insurance info is required",
    })
        .optional(),
    guardian: zod_1.z
        .string()
        .refine((value) => value !== null, {
        message: "Emergency contact is required",
    })
        .optional(),
});
