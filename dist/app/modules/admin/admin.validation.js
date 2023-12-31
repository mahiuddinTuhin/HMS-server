"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const zod_1 = require("zod");
const Common_Validation_1 = __importDefault(require("../../validation/Common.Validation"));
exports.adminValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: Common_Validation_1.default.emailValidation,
        phone: Common_Validation_1.default.phoneValidation,
        education: zod_1.z.array(Common_Validation_1.default.educationValidation),
        fullName: Common_Validation_1.default.fullNameValidation,
        address: Common_Validation_1.default.addressValidation,
        dateOfBirth: zod_1.z.string(),
        gender: zod_1.z.string(),
        profileImage: zod_1.z.string().url().optional(),
    }),
});
