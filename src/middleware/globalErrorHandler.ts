/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { MongoError } from "mongodb";
import { Error } from "mongoose";
import { ZodError } from "zod";
import handleValidationError from "../errors/handleValidationError";
import { TErrorSources } from "../modules/utils/TCommon.interface";
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

  if (err instanceof ZodError) {
    const simplifiedErrors = handledZodError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err instanceof Error.ValidationError) {
    const simplifiedErrors = handleValidationError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if ((err as MongoError).code === 11000) {
    statusCode = 400;
    message = err;
    // errorSources = simplifiedErrors?.errorSources;
  }

  return res
    .status(statusCode)
    .json({ success: false, message, errors: errorSources });
};
