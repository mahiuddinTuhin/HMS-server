"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsValidation = void 0;
const zod_1 = require("zod");
const contactValidation = zod_1.z.object({
  homeMobile: zod_1.z.string().min(11),
  officeMobile: zod_1.z.string().min(11),
  email: zod_1.z.string().email(),
});
const educationValidation = zod_1.z.object({
  institute: zod_1.z.string().min(3),
  degree: zod_1.z.string().min(3),
  year: zod_1.z.number().int(),
});
const personalInfoValidation = zod_1.z.object({
  address: zod_1.z.object({
    present_address: zod_1.z.string().min(10),
    permanent_address: zod_1.z.string().min(10),
  }),
  fullName: zod_1.z.object({
    firstName: zod_1.z.string().min(3),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().min(3),
  }),
  dateOfBirth: zod_1.z.string().min(6),
  gender: zod_1.z.string().min(4),
  profileImage: zod_1.z.string().min(5),
});
exports.utilsValidation = {
  contactValidation,
  educationValidation,
  personalInfoValidation,
};
