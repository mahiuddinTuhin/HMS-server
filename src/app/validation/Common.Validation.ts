import { z } from "zod";

export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`#^()-_=+$!%*?&])[A-Za-z\d@~`#^()-_=+$!%*?&]{8,}$/;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^\+?\d{11,15}$/;
// export const phonePattern = /^\+?\d{15}$/;

export const birthDatePattern =
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const educationValidation = z.object({
  institute: z.string().min(4),
  degree: z.string().min(2),
  year: z.string(),
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

const phoneValidation = z.string().min(11);

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

const resetPasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "old password is required for reset password!",
    }),
    newPassword: z.string({
      required_error: "new password is required for reset password!",
    }),
  }),
});

const globalValidators = {
  educationValidation,
  fullNameValidation,
  addressValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  resetPasswordValidation,
};
export default globalValidators;
