/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { MongoError } from "mongodb";
import { Error } from "mongoose";
import { ZodError } from "zod";

import handleValidationError from "../errors/handleValidationError";
import { TErrorSources } from "../interfaces/TCommon.interface";
import AppError from "../util/customError";
import handledZodError from "../util/zodErrorHandler";

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
  } else if (err instanceof Error.ValidationError) {
    /* handling schema validation error */
    const simplifiedErrors = handleValidationError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if ((err as MongoError).code === 11000) {
    /* handling duplicate error comes from mongodb index */
    statusCode = 409;
    const firstKey = Object.keys(err.keyValue)[0];
    const value = err.keyValue[firstKey];
    message = `Duplication occurs!`;
    errorSources[0].message = `'${value}' is already created in ${firstKey}`;
    errorSources[0].path = `${firstKey}`;
  } else if (err instanceof AppError) {
    /* handling AppError class message */
    message = err.message;
    errorSources[0].message = err.message;
    errorSources[0].path = "";
  }

  return res
    .status(statusCode)
    .json({ success: false, message, errors: errorSources });
};
