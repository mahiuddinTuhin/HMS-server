import { z } from "zod";

const loginValidation = z.object({
  id: z.string({ required_error: "Id is required" }),
  password: z.string({ required_error: "password is required" }),
});
export default loginValidation;

export const changePasswordValidation = z.object({
  oldPassword: z.string({ required_error: "Old password is required" }),
  newPassword: z.string({ required_error: "New password is required" }),
});
