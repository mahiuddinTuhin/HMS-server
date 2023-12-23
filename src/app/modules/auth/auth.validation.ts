import { z } from "zod";

const loginValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});

export default loginValidation;

export const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});

export const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh Token is required!" }),
  }),
});

export const forgetPasswordValidation = z.object({
  body: z.object({
    id: z.string({ required_error: "User id is required!" }),
  }),
});
