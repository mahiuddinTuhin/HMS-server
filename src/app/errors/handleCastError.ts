/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/TCommon.interface";

const handleCastError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  /* making the error as array from object */

  const newErr: any = Object?.values(err?.error?.errors)[0] || {};

  /* specifying the castError message */
  if (newErr.name === "CastError") {
    errorSources[0].message = `'${newErr?.value}' is not acceptable as it is ${newErr?.valueType} . Expected type ${newErr?.kind}`;
    errorSources[0].path = newErr?.path;
  }

  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid input type!",
    errorSources,
  };
};

export default handleCastError;
