"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`#^()-_=+$!%*?&])[A-Za-z\d@~`#^()-_=+$!%*?&]{8,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?(\d{1,4})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
const educationValidation = zod_1.z.object({
    institute: zod_1.z.string().min(4),
    degree: zod_1.z.string().min(2),
    year: zod_1.z.number(),
});
const fullNameValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(20),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().min(3).max(20),
});
const addressValidation = zod_1.z.object({
    presentAddress: zod_1.z.string().min(5),
    permanentAddress: zod_1.z.string().min(5),
});
// Basic email regex pattern
const phoneValidation = zod_1.z.string().min(11).regex(phonePattern);
const passwordValidation = zod_1.z
    .string()
    .optional()
    .refine((password) => {
    const newPassword = password || process.env.DEFAULT_PASSWORD;
    return passwordPattern.test(newPassword);
}, {
    message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.",
});
const emailValidation = zod_1.z
    .string()
    .optional()
    .refine((email) => emailPattern.test(email), {
    message: "Invalid email!",
});
const globalValidators = {
    educationValidation,
    fullNameValidation,
    addressValidation,
    emailValidation,
    phoneValidation,
    passwordValidation,
};
exports.default = globalValidators;
