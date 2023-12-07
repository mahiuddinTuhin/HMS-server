"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZDoctors = void 0;
const zod_1 = require("zod");
const doctor_constant_1 = require("./doctor.constant");
const ZMedicalHistory = zod_1.z.object({
  medical_id: zod_1.z.number(),
});
const ZContact = zod_1.z.object({
  home: zod_1.z
    .string({
      required_error: "Home address is required",
      invalid_type_error: "Home address must be a string",
    })
    .trim()
    .min(5, { message: "Home address be 5 or more characters long" }),
  office: zod_1.z
    .string({
      required_error: "Office address is required",
      invalid_type_error: "Office address must be a string",
    })
    .trim()
    .min(5, { message: "Office address be 5 or more characters long" }),
  email: zod_1.z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .trim()
    .email({ message: "Invalid email address" }),
});
exports.ZDoctors = zod_1.z.object({
  //   doctorsId: z.instanceof(Types.ObjectId),
  schedule: zod_1.z.array(
    zod_1.z.custom((value) => doctor_constant_1.schedules.includes(value), {
      message: "Invalid schedules.",
    }),
  ),
  medicalHistory: zod_1.z.array(ZMedicalHistory),
  contactInfo: ZContact,
  specialization: zod_1.z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(5, { message: "specialization must be 5 or more characters long" }),
  education: zod_1.z.array(
    zod_1.z
      .string({
        required_error: "education is required",
        invalid_type_error: "education must be a string",
      })
      .trim()
      .min(10, {
        message: "education must be 10 or more characters long",
      }),
  ),
  license_info: zod_1.z
    .string({
      required_error: "license_info is required",
      invalid_type_error: "license_info must be a string",
    })
    .trim()
    .min(10, { message: "license info must be 5 or more characters long" }),
  present_address: zod_1.z
    .string({
      required_error: "present address is required",
      invalid_type_error: "present address must be a string",
    })
    .trim()
    .min(5, { message: "present address must be 5 or more characters long" }),
  permanent_address: zod_1.z
    .string({
      required_error: "permanent address is required",
      invalid_type_error: "permanent address must be a string",
    })
    .trim()
    .min(5, { message: "permanent address must be 5 or more characters long" }),
  dateOfBirth: zod_1.z
    .string({
      required_error: "date of birth is required",
      invalid_type_error: "date of birth must be a string",
    })
    .trim()
    .min(5, {
      message: "date of birth must be 5 or more characters long",
    }),
  gender: zod_1.z
    .string({
      required_error: "gender is required",
      invalid_type_error: "gender must be a string",
    })
    .trim()
    .refine((value) => ["male", "female"].includes(value), {
      message: "Gender must be either 'male' or 'female'.",
    }),
  userId: zod_1.z.string(),
  password: zod_1.z.string().refine(
    (value) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(value);
    },
    {
      message:
        "- Password should be at least 8 characters long,\n - containing at least one uppercase letter, \n - one lowercase letter, \n - one number, \n - and one special character!",
    },
  ),
});
