import { z } from "zod";
import { schedules } from "./doctor.constant";

const ZMedicalHistory = z.object({
  medical_id: z.number(),
});

const ZContact = z.object({
  home: z
    .string({
      required_error: "Home address is required",
      invalid_type_error: "Home address must be a string",
    })
    .trim()
    .min(5, { message: "Home address be 5 or more characters long" }),
  office: z
    .string({
      required_error: "Office address is required",
      invalid_type_error: "Office address must be a string",
    })
    .trim()
    .min(5, { message: "Office address be 5 or more characters long" }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .trim()
    .email({ message: "Invalid email address" }),
});

export const ZDoctors = z.object({
  //   doctorsId: z.instanceof(Types.ObjectId),
  schedule: z.array(
    z.custom<string>((value) => schedules.includes(value as string), {
      message: "Invalid schedules.",
    }),
  ),

  medicalHistory: z.array(ZMedicalHistory),

  contactInfo: ZContact,

  specialization: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim()
    .min(5, { message: "specialization must be 5 or more characters long" }),

  education: z.array(
    z
      .string({
        required_error: "education is required",
        invalid_type_error: "education must be a string",
      })
      .trim()
      .min(10, {
        message: "education must be 10 or more characters long",
      }),
  ),

  license_info: z
    .string({
      required_error: "license_info is required",
      invalid_type_error: "license_info must be a string",
    })
    .trim()
    .min(10, { message: "license info must be 5 or more characters long" }),

  present_address: z
    .string({
      required_error: "present address is required",
      invalid_type_error: "present address must be a string",
    })
    .trim()
    .min(5, { message: "present address must be 5 or more characters long" }),

  permanent_address: z
    .string({
      required_error: "permanent address is required",
      invalid_type_error: "permanent address must be a string",
    })
    .trim()
    .min(5, { message: "permanent address must be 5 or more characters long" }),
  dateOfBirth: z
    .string({
      required_error: "date of birth is required",
      invalid_type_error: "date of birth must be a string",
    })
    .trim()
    .min(5, {
      message: "date of birth must be 5 or more characters long",
    }),
  gender: z
    .string({
      required_error: "gender is required",
      invalid_type_error: "gender must be a string",
    })
    .trim()
    .refine((value) => ["male", "female"].includes(value), {
      message: "Gender must be either 'male' or 'female'.",
    }),
  userId: z.string(),
  password: z.string().refine(
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
