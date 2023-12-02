"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZValidation = void 0;
const zod_1 = require("zod");
exports.userZValidation = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be string.   ",
    })
        .max(20, { message: "Password should not be longer than 20 characters." })
        .optional(),
    needsPasswordChange: zod_1.z.boolean().optional(),
});
