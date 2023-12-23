import { z } from "zod";
import validators from "../../validation/Common.Validation";

export const adminValidation = z.object({
  body: z.object({
    email: validators.emailValidation,
    phone: validators.phoneValidation,
    education: z.array(validators.educationValidation),
    fullName: validators.fullNameValidation,
    address: validators.addressValidation,
    dateOfBirth: z.string(),
    gender: z.string(),
    profileImage: z.string().url(),
  }),
});
