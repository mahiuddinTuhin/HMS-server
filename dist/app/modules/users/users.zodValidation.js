"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const Common_Validation_1 = __importDefault(require("../../validation/Common.Validation"));
exports.userValidation = zod_1.z.object({
    body: zod_1.z.object({
        needsPasswordChange: zod_1.z.boolean().default(true),
        password: Common_Validation_1.default.passwordValidation.optional(),
        email: Common_Validation_1.default.emailValidation,
    }),
});
