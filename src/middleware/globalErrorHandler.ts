/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  let message = err.message || "Something went wring!";
  let statusCode = err.statusCode || 500;

  let errorSources: TErrorSources[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  /* this function will organize each error message and will return */
  const handledZodError = (err: ZodError) => {
    statusCode = 400;
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

  if (err instanceof ZodError) {
    const simplifiedErrors = handledZodError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  }

  res
    .status(statusCode)
    .json({ success: false, message, errors: errorSources });
};
