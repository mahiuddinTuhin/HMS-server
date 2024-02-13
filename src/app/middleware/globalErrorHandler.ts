/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import AppError from "../errors/customError";
import handleCastError from "../errors/handleCastError";
import handleDuplcateError from "../errors/handleDuplicationError";
import handleValidationError from "../errors/handleValidationError";
import handledZodError from "../errors/zodErrorHandler";
import { TErrorSources } from "../interfaces/TCommon.interface";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  try {
    let message = err.message || "Something went wring!";
    let statusCode = err.statusCode || 500;

    let errorSources: Partial<TErrorSources[]> = [
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
      // console.log({ insideCasting: 1, err });
      // const simplifiedErrors = handleCastError(err);

      statusCode = err?.statusCode;
      errorSources = [
        {
          path: "",
          // message: `${err?.error?.name}: ${err?.error?.message}` as string,
          message: `${err?.message}`,
        },
      ];

      return res.status(statusCode).json({
        success: false,
        message,
        errors: errorSources,
      });
    } else if (err instanceof TypeError) {
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
  } catch (error: any) {
    res.status(500).json({ err });
  }
};
