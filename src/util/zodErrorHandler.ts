import { ZodError, ZodIssue } from "zod";

/* this function will organize each error message and will return */
const handledZodError = (err: ZodError) => {
  const statusCode = 400;
  /* it will have an array of string */
  const errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1] as string,
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: "Validation error!",
    errorSources,
  };
};

export default handledZodError;
