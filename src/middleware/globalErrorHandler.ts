/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  const message = err.message || "Something went wring!";
  res.status(400).json({ success: false, message, error: err });
};
