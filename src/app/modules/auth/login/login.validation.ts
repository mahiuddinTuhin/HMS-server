import { z } from "zod";

const loginValidation = z.object({
  id: z.string({ required_error: "Id is required" }),
  password: z.string({ required_error: "password is required" }),
});
export default loginValidation;
