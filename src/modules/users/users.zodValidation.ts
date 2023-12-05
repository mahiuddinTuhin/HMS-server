import { z } from "zod";
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~`#^()-_=+$!%*?&])[A-Za-z\d@~`#^()-_=+$!%*?&]{8,}$/;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userValidation = z.object({
  needsPasswordChange: z.boolean().default(true),

  /* either user will give a password otherwise default password will be set */
  password: z
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
    ),
  email: z
    .string()
    .optional()
    .refine((email) => emailPattern.test(email as string), {
      message: "Invalid email!",
    }),
});
