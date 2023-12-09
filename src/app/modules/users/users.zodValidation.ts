import { z } from "zod";
import validators from "../../validation/Common.Validation";

export const userValidation = z.object({
  needsPasswordChange: z.boolean().default(true),
  password: validators.passwordValidation.optional(),
  email: validators.emailValidation,
});
