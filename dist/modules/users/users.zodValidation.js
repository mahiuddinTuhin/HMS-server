"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`#^()-_=+$!%*?&])[A-Za-z\d@~`#^()-_=+$!%*?&]{8,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.userValidation = zod_1.z.object({
    needsPasswordChange: zod_1.z.boolean().default(true),
    /* either user will give a password otherwise default password will be set */
    password: zod_1.z
        .string()
        .optional()
        .refine((password) => {
        const newPassword = password || process.env.DEFAULT_PASSWORD;
        passwordPattern.test(newPassword);
    }, {
        message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.",
    }),
    email: zod_1.z
        .string()
        .optional()
        .refine((email) => emailPattern.test(email), {
        message: "Invalid email!",
    }),
});
