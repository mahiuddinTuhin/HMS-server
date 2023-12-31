"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const staffValidation = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().optional(),
        id: zod_1.z
            .string({
            required_error: "ID is required",
            invalid_type_error: "ID must be a string",
        })
            .optional(),
        shift: zod_1.z.enum(["day", "night"], {
            required_error: "Shift is required",
            invalid_type_error: "Shift must be 'day' or 'night'",
        }),
        education: zod_1.z.array(zod_1.z.object({})),
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email(),
        phone: zod_1.z.string({
            required_error: "Phone is required",
            invalid_type_error: "Phone must be a string",
        }),
        fullName: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is required",
                invalid_type_error: "First name must be a string",
            }),
            middleName: zod_1.z
                .string({
                required_error: "Middle name is required",
                invalid_type_error: "Middle name must be a string",
            })
                .optional(),
            lastName: zod_1.z.string({
                required_error: "Last name is required",
                invalid_type_error: "Last name must be a string",
            }),
        }),
        address: zod_1.z.object({
            presentAddress: zod_1.z.string({
                required_error: "Present address is required",
                invalid_type_error: "Present address must be a string",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "Permanent address is required",
                invalid_type_error: "Permanent address must be a string",
            }),
        }),
        dateOfBirth: zod_1.z.string({
            required_error: "Date of birth is required",
            invalid_type_error: "Date of birth must be a string",
        }),
        gender: zod_1.z.string({
            required_error: "Gender is required",
            invalid_type_error: "Gender must be a string",
        }),
        profileImage: zod_1.z
            .string({
            required_error: "Profile image is required",
            invalid_type_error: "Profile image must be a string",
        })
            .optional(),
    }),
});
exports.default = staffValidation;
