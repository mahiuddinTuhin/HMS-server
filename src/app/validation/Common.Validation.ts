import { z } from "zod";

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`#^()-_=+$!%*?&])[A-Za-z\d@~`#^()-_=+$!%*?&]{8,}$/;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^\+?\d{13}$/;

export const birthDatePattern =
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const educationValidation = z.object({
  institute: z.string().min(4),
  degree: z.string().min(2),
  year: z.number(),
});

const fullNameValidation = z.object({
  firstName: z.string().min(3).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(3).max(20),
});

const addressValidation = z.object({
  presentAddress: z.string().min(5),
  permanentAddress: z.string().min(5),
});

// Basic email regex pattern

const phoneValidation = z.string().min(11).regex(phonePattern);

const passwordValidation = z
  .string()
  .optional()
  .refine(
    (password) => {
      const newPassword: string =
        password || (process.env.DEFAULT_PASSWORD as string);
      return passwordPattern.test(newPassword);
    },
    {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.",
    },
  );

const emailValidation = z
  .string()
  .optional()
  .refine((email) => emailPattern.test(email as string), {
    message: "Invalid email!",
  });

const globalValidators = {
  educationValidation,
  fullNameValidation,
  addressValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
};
export default globalValidators;
