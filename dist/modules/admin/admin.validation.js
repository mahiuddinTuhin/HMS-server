"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const Common_Validation_1 = require("../utils/Common.Validation");
// Define Zod schemas for the different parts of the Admin schema
// Define the Admin schema using Zod
exports.AdminValidation = zod_1.z.object({
    contactInfo: Common_Validation_1.utilsValidation.contactValidation,
    education: Common_Validation_1.utilsValidation.educationValidation,
    personalInfo: Common_Validation_1.utilsValidation.personalInfoValidation,
});
