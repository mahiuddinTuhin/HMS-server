/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import AppError from "../errors/customError";
import handleCastError from "../errors/handleCastError";
import handleDuplcateError from "../errors/handleDuplicationError";
import handleValidationError from "../errors/handleValidationError";
import { TErrorSources } from "../interfaces/TCommon.interface";
import handledZodError from "../utils/zodErrorHandler";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let message = err.message || "Something went wring!";
  let statusCode = err.statusCode || 500;

  let errorSources: TErrorSources[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  /* handling zod validation error  */
  if (err instanceof ZodError) {
    const simplifiedErrors = handledZodError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err?.name === "ValidationError") {
    /* handling schema validation error */
    const simplifiedErrors = handleValidationError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err.name === "CastError") {
    /* handling schema validation error */
    const simplifiedErrors = handleCastError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err?.code === 11000) {
    /* handling duplication error */
    const simplifiedErrors = handleDuplcateError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err instanceof AppError) {
    /* handling AppError class message */
    message = err?.message;
    errorSources[0].message = err?.message;
    errorSources[0].path = "";
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // const newObj: any = Object.values(err.error.errors);

  return res.status(statusCode).json({
    success: false,
    message,
    errors: errorSources,
  });
};
