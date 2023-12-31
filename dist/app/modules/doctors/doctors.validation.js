"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const DoctorValidation = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z
            .string({
            required_error: "Doctor ID is required",
            invalid_type_error: "Doctor ID must be a string",
        })
            .optional(),
        user: zod_1.z.string().optional(),
        department: zod_1.z.string(),
        schedules: zod_1.z.array(zod_1.z.string()).optional(),
        allMedicalHistory: zod_1.z.array(zod_1.z.string()).optional(),
        pendingAppointments: zod_1.z.array(zod_1.z.string()).optional(),
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email(),
        phone: zod_1.z
            .string({
            required_error: "Phone number is required",
            invalid_type_error: "Phone number must be a string",
        })
            .min(11, "Phone number should be minimum 11 digit long."),
        education: zod_1.z
            .array(zod_1.z.object({}))
            .min(1, "At least one education entry is required"),
        fullName: zod_1.z.object({
            firstName: zod_1.z
                .string({
                required_error: "First name is required",
                invalid_type_error: "First name must be a string",
            })
                .min(3, "First name should be minimum 3 character long!"),
            middleName: zod_1.z
                .string({
                required_error: "Middle name is required",
                invalid_type_error: "Middle name must be a string",
            })
                .min(3, "Middle name should be minimum 3 character long!")
                .optional(),
            lastName: zod_1.z
                .string({
                required_error: "Last name is required",
                invalid_type_error: "Last name must be a string",
            })
                .min(3, "Last name should be minimum 3 character long!"),
        }),
        address: zod_1.z.object({
            presentAddress: zod_1.z
                .string({
                required_error: "Present address is required",
                invalid_type_error: "Present address must be a string",
            })
                .min(5, "Present address should be minimum 5 character long!"),
            permanentAddress: zod_1.z
                .string({
                required_error: "Permanent address is required",
                invalid_type_error: "Permanent address must be a string",
            })
                .min(5, "Permanent address should be minimum 5 character long!"),
        }),
        dateOfBirth: zod_1.z
            .string({
            required_error: "Date of birth is required",
            invalid_type_error: "Date of birth must be a string",
        })
            .min(6, "Date of birth should be minimum 5 character long!"),
        gender: zod_1.z
            .string({
            required_error: "Gender is required",
            invalid_type_error: "Gender must be a string",
        })
            .min(4, "Gender should be minimum 4 character long!"),
        profileImage: zod_1.z
            .string({
            required_error: "Profile image URL is required",
            invalid_type_error: "Profile image URL must be a string",
        })
            .min(5, "Profile image URL should be minimum 5 character long!")
            .optional(),
        license_info: zod_1.z.string({
            required_error: "license_info is required",
            invalid_type_error: "license_info must be a string",
        }),
    }),
});
exports.default = DoctorValidation;
