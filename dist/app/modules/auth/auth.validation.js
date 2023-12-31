"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = exports.forgetPasswordValidation = exports.refreshTokenValidation = exports.changePasswordValidation = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Id is required" }),
        password: zod_1.z.string({ required_error: "password is required" }),
    }),
});
exports.default = loginValidation;
exports.changePasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: "Old password is required" }),
        newPassword: zod_1.z.string({ required_error: "New password is required" }),
    }),
});
exports.refreshTokenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: "Refresh Token is required!" }),
    }),
});
exports.forgetPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "User id is required!" }),
    }),
});
exports.resetPasswordValidation = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "User id is required!" }),
        newPassword: zod_1.z.string({ required_error: "User new password is required!" }),
    }),
});
