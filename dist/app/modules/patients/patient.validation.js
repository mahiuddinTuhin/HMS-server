"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientValidation = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
exports.patientValidation = zod_1.z.object({
    user: zod_1.z.string().refine((value) => value !== null, {
        message: "User ID is required",
    }),
    id: zod_1.z.string().refine((value) => value !== null, {
        message: "ID is required",
    }),
    allMedicalHistory: zod_1.z.array(zod_1.z.string()).optional(),
    pendingAppointments: zod_1.z
        .array(zod_1.z.object({
        doctor: zod_1.z.string().refine((value) => value !== null, {
            message: "Doctor ID is required",
        }),
        date: zod_1.z.string().refine((value) => value !== null, {
            message: "Date is required",
        }),
        time: zod_1.z.string().refine((value) => value !== null, {
            message: "Time is required",
        }),
    }))
        .optional(),
    allAppointmentHistory: zod_1.z
        .array(zod_1.z.object({
        doctor: zod_1.z.string().refine((value) => value !== null, {
            message: "Doctor ID is required",
        }),
        date: zod_1.z.string().refine((value) => value !== null, {
            message: "Date is required",
        }),
        time: zod_1.z.string().refine((value) => value !== null, {
            message: "Time is required",
        }),
    }))
        .optional(),
    allDiagnosis: zod_1.z
        .array(zod_1.z.string())
        .refine((value) => value !== null, {
        message: "All diagnosis is required",
    })
        .optional(),
    isAdmitted: zod_1.z.boolean().default(false),
    currentMedicalDepartment: zod_1.z
        .instanceof(mongodb_1.ObjectId)
        .refine((value) => value !== null, {
        message: "Current medical department is required",
    }),
    bills: zod_1.z
        .number()
        .default(0)
        .refine((value) => value !== null, {
        message: "Bills is required",
    }),
    contactNumber: zod_1.z
        .string()
        .refine((value) => value !== null, {
        message: "Contact number is required",
    })
        .optional(),
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
