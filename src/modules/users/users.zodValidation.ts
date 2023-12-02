import { z } from "zod";

export const userZValidation = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string.   ",
    })
    .max(20, { message: "Password should not be longer than 20 characters." })
    .optional(),
  needsPasswordChange: z.boolean().optional(),
});
