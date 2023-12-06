import { Error } from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../../modules/utils/TCommon.interface";

const handleValidationError = (
  err: Error.ValidationError,
): TGenericErrorResponse => {
  const message: TErrorSources[] = Object.values(err.errors).map((err) => {
    if (err instanceof Error.CastError) {
      return {
        path: err.path,
        message: `'${err.value}' is not accectable as ${err.path}. Please Enter a ${err.kind} type value.`,
      };
    }
    return {
      path: err.path,
      message: err.message,
    };
  });

  // const statusCode = 400;
  return {
    statusCode: 400,
    message: "Validation error!",
    errorSources: message,
  };
};

export default handleValidationError;
