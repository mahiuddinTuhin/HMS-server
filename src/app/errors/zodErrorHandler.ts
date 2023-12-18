import { ZodError, ZodIssue } from "zod";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/TCommon.interface";

/* this function will organize each error message and will return */
const handledZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = 400;
  /* it will have an array of string */
  const errorSources: TErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path,
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
